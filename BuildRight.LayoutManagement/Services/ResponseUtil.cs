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

    private string toCamelCase(string @string)
    {
        if (string.IsNullOrEmpty(@string)) return @string;

        if (@string.Length == 1) return @string.ToLower();

        return char.ToLower(@string[0]) + @string.Substring(1);
    }
}
