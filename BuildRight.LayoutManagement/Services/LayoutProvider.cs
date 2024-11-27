using BuildRight.LayoutManagement.Types.Interfaces;
using System.Reflection;

namespace BuildRight.LayoutManagement.Services;

public class LayoutProvider
{
    public IEnumerable<Type> Types { get; init; }

    public LayoutProvider()
    {
        Types = Assembly
            .GetExecutingAssembly()
            .GetTypes()
            .Where(t => typeof(ILayout).IsAssignableFrom(t) && t.IsClass && !t.IsAbstract);
    }
}
