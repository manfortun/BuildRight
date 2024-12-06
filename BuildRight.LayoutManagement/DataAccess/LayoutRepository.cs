using AutoMapper;
using BuildRight.LayoutManagement.Models;
using BuildRight.LayoutManagement.Services;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BuildRight.LayoutManagement.DataAccess;

public class LayoutRepository
{
    private readonly IMongoCollection<BsonDocument> _layouts;
    private readonly TypeProvider<Layout> _layoutProvider;
    private readonly IMapper _mapper;
    private const string COLLECTION_NAME = "Layouts";

    public LayoutRepository(IMongoClient client, IOptions<MongoDbSettings> settings, TypeProvider<Layout> layoutProvider, IMapper mapper)
    {
        var database = client.GetDatabase(settings.Value.DatabaseName);
        _layouts = database.GetCollection<BsonDocument>(COLLECTION_NAME);
        _layoutProvider = layoutProvider;
        _mapper = mapper;
    }

    /// <summary>
    /// Obtain items based on the <paramref name="predicate"/>.
    /// </summary>
    /// <typeparam name="TLayout"></typeparam>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public List<Layout> GetItems(Func<Layout, bool>? predicate = null)
    {
        var documents = _layouts.Find(FilterDefinition<BsonDocument>.Empty).ToList();
        var layouts = documents.Select(_mapper.Map<Layout>).Where(l => l != null).ToList();

        if (predicate is not null)
        {
            layouts = layouts.Where(predicate).ToList();
        }

        return layouts.OfType<Layout>().ToList();
    }

    /// <summary>
    /// Get element with <paramref name="id"/>.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public Layout? GetElement(string id)
    {
        var documents = _layouts.Find(FilterDefinition<BsonDocument>.Empty).ToList();

        foreach (var doc in documents)
        {
            var result = FindNestedElement(doc, id);
            if (result is not null) return _mapper.Map<Layout>(result);
        }
        return null;
    }

    /// <summary>
    /// Obtain an element regardless of its position in the nest
    /// </summary>
    /// <param name="document"></param>
    /// <param name="id"></param>
    /// <returns></returns>
    private BsonDocument? FindNestedElement(BsonDocument document, string id)
    {
        if (document.Contains("_id") && document["_id"].AsString == id)
        {
            return document;
        }

        if (document.Contains("Children") && document["Children"].IsBsonArray)
        {
            var children = document["Children"].AsBsonArray;
            foreach (var child in children)
            {
                var found = FindNestedElement(child.AsBsonDocument, id);
                if (found is not null) return found;
            }
        }

        return null;
    }

    /// <summary>
    /// Obtain layouts of a page
    /// </summary>
    /// <typeparam name="TLayout"></typeparam>
    /// <param name="page"></param>
    /// <returns></returns>
    public IOrderedEnumerable<Layout> GetPageSections(string page)
    {
        var sections = this.GetItems(item => item.Page == page);

        var instances = new List<Layout>();

        foreach (var section in sections)
        {
            var type = _layoutProvider.Types.FirstOrDefault(t => t.AssemblyQualifiedName == section.GetType().AssemblyQualifiedName);

            if (type is not null)
            {
                var instance = Activator.CreateInstance(type) as Layout;
                instances.Add(instance);
            }
        }

        return sections.Where(s => s.Order is not null).OrderBy(s => s.Order);
    }

    /// <summary>
    /// Add an item to the database
    /// </summary>
    /// <param name="bsonDocument"></param>
    public void AddItem(BsonDocument bsonDocument)
    {
        _layouts.InsertOne(bsonDocument);
    }

    public async Task UpdateElementAsync(Layout request)
    {
        var parentElement = GetParentElement(request.Id);
        var layout = GetElement(request.Id);

        if (parentElement is not null && layout is not null)
        {
            var updatedElement = UpdateElement(parentElement, request);
            var update = _mapper.Map<BsonDocument>(updatedElement);

            var filter = Builders<BsonDocument>.Filter.Eq("_id", updatedElement.Id);

            await _layouts.ReplaceOneAsync(filter, update);
        }
    }

    /// <summary>
    /// Update an element
    /// </summary>
    /// <param name="parentElement"></param>
    /// <param name="elementToInsert"></param>
    /// <returns></returns>
    public Layout UpdateElement(Layout parentElement, Layout elementToInsert)
    {
        if (parentElement.Id == elementToInsert.Id)
        {
            parentElement = elementToInsert;
            return parentElement;
        }

        if (parentElement is LayoutWithChildren layoutWithChildren)
        {
            var children = new List<Layout>();
            foreach (var child in layoutWithChildren.Children)
            {
                children.Add(UpdateElement(child, elementToInsert));
            }

            layoutWithChildren.Children = children;
        }

        return parentElement;
    }

    public async Task DeleteElementAsync(string id)
    {
        var element = this.GetElement(id);
        var parent = this.GetParentElement(id);

        if (element is null || parent is null) return;

        if (parent.Id == id)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", id);
            _layouts.DeleteOne(filter);
        }
        else
        {
            await DeleteChildAsync(parent, id);
        }
    }

    /// <summary>
    /// Delete child of an element
    /// </summary>
    /// <param name="parent"></param>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<bool> DeleteChildAsync(Layout parent, string id)
    {
        if (parent is LayoutWithChildren layoutWithChildren)
        {
            if (layoutWithChildren.Children is not null)
            {
                if (layoutWithChildren.Children.Any(c => c.Id == id) == true)
                {
                    layoutWithChildren.Children = layoutWithChildren.Children.Where(c => c.Id != id);
                    await UpdateElementAsync(layoutWithChildren);

                    return true;
                }
                else
                {
                    foreach (var child in layoutWithChildren.Children)
                    {
                        if (await DeleteChildAsync(child, id)) return true;
                    }

                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        return false;
    }

    /// <summary>
    /// Get the topmost parent of the element with <paramref name="id"/>.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    private Layout? GetParentElement(string id)
    {
        var documents = _layouts.Find(FilterDefinition<BsonDocument>.Empty).ToList();

        foreach (var doc in documents)
        {
            var result = FindNestedElement(doc, id);

            if (result is not null) return _mapper.Map<Layout>(doc);
        }

        return null;
    }
}
