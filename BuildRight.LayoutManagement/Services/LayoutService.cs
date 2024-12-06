using AutoMapper;
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
    private readonly IMapper _mapper;

    public LayoutService(
        LayoutRepository repository,
        JsonToLayoutService jsonToLayoutService,
        TypeProvider<Layout> layoutProvider,
        IMapper mapper)
    {
        _repository = repository;
        _jsonToLayoutService = jsonToLayoutService;
        _layoutProvider = layoutProvider;
        _mapper = mapper;
    }

    /// <summary>
    /// Retrieve all the types of layouts (Example: Section, ArrayDisplay, etc.)
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public IEnumerable<Layout> GetLayoutList(LayoutGetRequest request)
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

    /// <summary>
    /// Obtain the list of layouts of a page
    /// </summary>
    /// <param name="pageName"></param>
    /// <returns></returns>
    public IOrderedEnumerable<Layout> GetPage(string pageName)
    {
        var sections = _repository.GetPageSections(pageName);

        return sections;
    }

    /// <summary>
    /// Obtain a layout element
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public Layout? GetElement(string id)
    {
        var element = _repository.GetElement(id);

        return element;
    }

    /// <summary>
    /// Update or insert a layout
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    public async Task UpsertLayoutAsync(LayoutAddRequest request)
    {
        List<Layout> layoutsList = _jsonToLayoutService.ToLayouts(request.Properties);

        foreach (var layout in layoutsList)
        {
            var bsonDoc = _mapper.Map<BsonDocument>(layout);

            string? id = bsonDoc["_id"]?.ToString();

            if (!string.IsNullOrEmpty(id) && this.GetElement(id) is not null)
            {
                await _repository.UpdateElementAsync(layout);
            }
            else
            {
                _repository.AddItem(bsonDoc);
            }
        }
    }

    public async Task AddChildAsync(LayoutAddRequest request)
    {
        ArgumentNullException.ThrowIfNullOrWhiteSpace(request.ParentId);

        // check if parent exists
        var parent = _repository.GetElement(request.ParentId);

        if (parent is LayoutWithChildren layoutWithChildren)
        {
            var newChildren = new List<Layout>(layoutWithChildren.Children ?? []);

            List<Layout> children = _jsonToLayoutService.ToLayouts(request.Properties);
            newChildren.AddRange(children);

            layoutWithChildren.Children = newChildren;

            await _repository.UpdateElementAsync(layoutWithChildren);
        }
    }

    public async Task DeleteElementAsync(string id)
    {
        await _repository.DeleteElementAsync(id);
    }
}
