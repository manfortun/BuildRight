using System.Reflection;

namespace BuildRight.LayoutManagement.Services;

public class TypeProvider<TType>
{
    public IEnumerable<Type> Types { get; init; }

    public TypeProvider()
    {
        Types = Assembly
            .GetExecutingAssembly()
            .GetTypes()
            .Where(t => typeof(TType).IsAssignableFrom(t) && t.IsClass && !t.IsAbstract);
    }
}
