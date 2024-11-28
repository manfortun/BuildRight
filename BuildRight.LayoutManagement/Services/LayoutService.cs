using BuildRight.LayoutManagement.DataAccess;
using BuildRight.LayoutManagement.Models;
using BuildRight.LayoutManagement.RequestDTOs;
using MongoDB.Bson;

namespace BuildRight.LayoutManagement.Services;

public class LayoutService
{
    private readonly LayoutRepository _repository;
    private readonly JsonToLayoutService _jsonToLayoutService;
    private readonly TypeProvider<Layout> _layoutProvider;

    public LayoutService(
        LayoutRepository repository,
        JsonToLayoutService jsonToLayoutService,
        TypeProvider<Layout> layoutProvider)
    {
        _repository = repository;
        _jsonToLayoutService = jsonToLayoutService;
        _layoutProvider = layoutProvider;
    }

    public IEnumerable<Layout> GetLayouts(LayoutGetRequest request)
    {
        var layouts = _layoutProvider.Types;

        if (!string.IsNullOrEmpty(request.Name))
        {
            layouts = layouts.Intersect(_layoutProvider.Types.Where(t => t.Name.Equals(request.Name)));
        }

        if (!string.IsNullOrEmpty(request.Type))
        {
            throw new NotImplementedException();
        }

        if (layouts.Any())
        {
            return layouts
                .Select(l => Activator.CreateInstance(l) as Layout)
                .OfType<Layout>();
        }

        return [];
    }

    public async Task<IOrderedEnumerable<Layout>> GetPage(string pageName)
    {
        var sections = await _repository.GetPageSectionsAsync<Layout>(pageName);

        return sections;
    }

    public void UpsertSection(LayoutAddRequest request)
    {
        List<Layout> layoutsList = _jsonToLayoutService.ToLayouts(request.Properties);

        foreach (var layout in layoutsList)
        {
            BsonDocument bsonDoc = this.ToBsonDocument(layout);

            _repository.AddItem(bsonDoc);
        }
    }

    private BsonDocument ToBsonDocument(Layout item)
    {
        BsonDocument bsonDoc = item.ToBsonDocument();
        bsonDoc["_type"] = item.GetType().AssemblyQualifiedName;

        if (item.Children?.Count() > 0)
        {
            BsonArray bsonChildren = new BsonArray();
            foreach (var child in item.Children)
            {
                BsonDocument bsonChild = this.ToBsonDocument(child);
                bsonChildren.Add(bsonChild);
            }

            if (bsonDoc.Contains("Children"))
            {
                bsonDoc["Children"] = bsonChildren;
            }
        }

        return bsonDoc;
    }
}
