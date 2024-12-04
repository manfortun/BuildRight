using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class Section : LayoutWithChildren
{
    public string? BackgroundColor { get; set; } = default!;
}
