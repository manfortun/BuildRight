namespace BuildRight.LayoutManagement.Models;

public abstract class LayoutWithChildren : Layout
{
    public IEnumerable<Layout> Children { get; set; } = default!;
}
