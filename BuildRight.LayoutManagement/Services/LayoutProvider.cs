using BuildRight.LayoutManagement.Models;
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
            .Where(t => typeof(Layout).IsAssignableFrom(t) && t.IsClass && !t.IsAbstract);
    }
}
