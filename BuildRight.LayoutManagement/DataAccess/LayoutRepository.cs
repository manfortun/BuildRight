using BuildRight.LayoutManagement.Models;
using BuildRight.LayoutManagement.Services;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace BuildRight.LayoutManagement.DataAccess;

public class LayoutRepository
{
    private readonly IMongoCollection<BsonDocument> _layouts;
    private readonly LayoutProvider _layoutProvider;

    public LayoutRepository(IMongoClient client, IOptions<MongoDbSettings> settings, LayoutProvider layoutProvider)
    {
        var database = client.GetDatabase(settings.Value.DatabaseName);
        _layouts = database.GetCollection<BsonDocument>("Layouts");
        _layoutProvider = layoutProvider;
    }

    public async Task<List<TLayout>> GetItemsAsync<TLayout>(Func<Layout, bool>? predicate = null) where TLayout : Layout
    {
        var documents = _layouts.Find(FilterDefinition<BsonDocument>.Empty).ToList();
        var layouts = documents.Select(DeserializeLayout).Where(l => l != null).ToList();

        if (predicate is not null)
        {
            layouts = layouts.Where(predicate).ToList();
        }

        return layouts.OfType<TLayout>().ToList();
    }

    public async Task<IOrderedEnumerable<TLayout>> GetPageSectionsAsync<TLayout>(string page) where TLayout : Layout
    {
        var sections = await this.GetItemsAsync<TLayout>(item => item.Page == page);

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

    public void AddItem(BsonDocument bsonDoc)
    {
        _layouts.InsertOne(bsonDoc);
    }

    public static Layout? DeserializeLayout(BsonDocument bsonDoc)
    {
        if (bsonDoc.Contains("_type"))
        {
            string? typeName = bsonDoc["_type"].AsString;
            Type? type = Type.GetType(typeName);
            var children = new List<Layout>();

            if (type != null)
            {
                BsonArray bsonChildrenArray = new BsonArray();
                if (bsonDoc.Contains("Children") && bsonDoc["Children"] is BsonArray bsonChildren)
                {
                    foreach (var bsonChild in bsonChildren)
                    {
                        var bsonChildDocument = DeserializeLayout(bsonChild.AsBsonDocument);
                        children.Add(bsonChildDocument);
                    }

                    bsonDoc.Remove("Children");
                }

                bsonDoc.Remove("_type");
                Layout layout = (Layout)BsonSerializer.Deserialize(bsonDoc, type);

                layout.Children = children;

                return layout;
            }
        }

        return null; // Handle unknown types gracefully
    }
}
