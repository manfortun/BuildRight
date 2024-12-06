using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;
using System.Reflection;

namespace BuildRight.LayoutManagement.Services;

public class ResponseUtil
{
    /// <summary>
    /// Temporary solution to json conversion issues where only the properties
    /// of the base class are
    /// </summary>
    /// <typeparam name="TType"></typeparam>
    /// <param name="items"></param>
    /// <returns></returns>
    public object[] ToOutput<TType>(params TType[] items) where TType : class
    {
        var objectList = new List<object>();
        foreach (var item in items)
        {
            PropertyInfo[] properties = item.GetType().GetProperties();
            var instance = new Dictionary<string, object?>();

            foreach (var property in properties)
            {
                var value = property.GetValue(item);

                if (value is IEnumerable<object> valueList && valueList.Count() > 0)
                {
                    value = this.ToOutput(valueList.ToArray());
                }
                instance[this.toCamelCase(property.Name)] = value;
            }

            objectList.Add(instance);
        }

        return [.. objectList];
    }

    public Dictionary<string, Dictionary<string, object>> AsPropertyList(params Layout[] items)
    {
        var metadata = new Dictionary<string, Dictionary<string, object>>();
        foreach (var item in items)
        {
            if (metadata.ContainsKey(item.Type)) continue;
            metadata.Add(item.Type, new Dictionary<string, object>());
            PropertyInfo[] properties = item.GetType().GetProperties();

            foreach (var prop in properties)
            {
                var attribute = prop.GetCustomAttribute<DisplayMetadataAttribute>();
                if (attribute is not null)
                {
                    metadata[item.Type][toCamelCase(prop.Name)] = new Dictionary<string, object>
                    {
                        { nameof(attribute.DisplayName), attribute.DisplayName },
                        { nameof(attribute.Placeholder), attribute.Placeholder },
                        { nameof(attribute.InputType), attribute.InputType },
                        { nameof(attribute.CanWrite), attribute.CanWrite }
                    };
                }
            }
        }

        return metadata;
    }

    private string toCamelCase(string @string)
    {
        if (string.IsNullOrEmpty(@string)) return @string;

        if (@string.Length == 1) return @string.ToLower();

        return char.ToLower(@string[0]) + @string.Substring(1);
    }
}
