using AutoMapper;
using BuildRight.LayoutManagement.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;

namespace BuildRight.LayoutManagement.Profiles;

public class ServerProfile : Profile
{
    public ServerProfile()
    {
        CreateMap<BsonDocument, Layout>()
            .ConvertUsing<BsonDocumentToLayoutConverter>();

        CreateMap<Layout, BsonDocument>()
            .ConvertUsing<LayoutToBsonDocumentConverter>();
    }
}

public class LayoutToBsonDocumentConverter : ITypeConverter<Layout, BsonDocument>
{
    private readonly IMapper _mapper;

    public LayoutToBsonDocumentConverter(IMapper mapper)
    {
        _mapper = mapper;
    }

    public BsonDocument Convert(Layout source, BsonDocument destination, ResolutionContext context)
    {
        var bsonDoc = source.ToBsonDocument();
        bsonDoc["_type"] = this.GetType().AssemblyQualifiedName;

        if (source is LayoutWithChildren layoutWithChildren)
        {
            BsonArray bsonChildren = new BsonArray();

            foreach (var child in layoutWithChildren.Children)
            {
                BsonDocument bsonChild = _mapper.Map<BsonDocument>(child);
                bsonChildren.Add(bsonChild);
            }

            bsonDoc[nameof(layoutWithChildren.Children)] = bsonChildren;
        }

        return bsonDoc;
    }
}

public class BsonDocumentToLayoutConverter : ITypeConverter<BsonDocument, Layout>
{
    private readonly IMapper _mapper;

    public BsonDocumentToLayoutConverter(IMapper mapper)
    {
        _mapper = mapper;
    }

    public Layout Convert(BsonDocument source, Layout destination, ResolutionContext context)
    {
        if (!source.Contains("_type")) throw new InvalidCastException("Cannot determine the type to convert.");

        string? typeName = source["_type"].AsString;
        Type? type = Type.GetType(typeName);

        if (type is null) throw new InvalidCastException("Cannot determine the type to convert.");

        source.Remove("_type");

        if (source.Contains("Children") && source["Children"].IsBsonArray)
        {
            var bsonChildren = source["Children"].AsBsonArray;
            var children = new List<Layout>();

            foreach (var child in bsonChildren)
            {
                var childLayout = _mapper.Map<Layout>(child.AsBsonDocument);
                children.Add(childLayout);
            }

            source.Remove("Children");

            LayoutWithChildren layout = (LayoutWithChildren)BsonSerializer.Deserialize(source, type);
            layout.Children = children;
            return layout;
        }
        else
        {
            Layout layout = (Layout)BsonSerializer.Deserialize(source, type);
            return layout;
        }

        throw new InvalidCastException();
    }
}