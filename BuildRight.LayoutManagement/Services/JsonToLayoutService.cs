using BuildRight.LayoutManagement.Models;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace BuildRight.LayoutManagement.Services;

public class JsonToLayoutService
{
    private readonly LayoutProvider _layoutProvider;

    public JsonToLayoutService(LayoutProvider layoutProvider)
    {
        _layoutProvider = layoutProvider;
    }

    public Layout? CreateInstance(Type type, JsonNode node)
    {
        PropertyInfo[]? properties = type.GetProperties();
        Layout? instance = Activator.CreateInstance(type) as Layout;

        foreach (var property in properties)
        {
            if (!property.CanWrite) continue;

            JsonNode? propertyValue = node[property.Name];

            if (propertyValue is null) continue;

            try
            {
                Type propertyType = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;

                object? value = propertyType switch
                {
                    // Handle basic types explicitly
                    Type t when t == typeof(int) => propertyValue.GetValue<int>(),
                    Type t when t == typeof(double) => propertyValue.GetValue<double>(),
                    Type t when t == typeof(bool) => propertyValue.GetValue<bool>(),
                    Type t when t == typeof(string) => propertyValue.ToString(),
                    Type t when t == typeof(IEnumerable<Layout>) => ToLayouts(propertyValue),
                    Type t when t.IsEnum => Enum.Parse(propertyType, propertyValue.ToString() ?? ""),
                    _ => JsonSerializer.Deserialize(propertyValue.ToJsonString(), propertyType)
                };

                property.SetValue(instance, value);
            }
            catch
            {
                // FALLTHROUGH
            }
        }

        return instance;
    }

    public List<Layout> ToLayouts(dynamic request)
    {
        var layoutList = new List<Layout>();

        string jsonString = request is string ? request : JsonSerializer.Serialize(request);
        JsonNode? node = JsonNode.Parse(jsonString);

        if (node is JsonArray jsonArray)
        {
            foreach (JsonNode? item in jsonArray)
            {
                layoutList.AddRange(ToLayouts(item));
            }
        }
        else
        {
            if (node?["LayoutType"]?.ToString() is string page)
            {
                Type? type = _layoutProvider.Types.FirstOrDefault(t => t.Name == page);

                if (type is not null)
                {
                    Layout? instance = CreateInstance(type, node);
                    if (instance is not null)
                    {
                        layoutList.Add(instance);
                    }
                }
            }
        }

        return layoutList;
    }
}
