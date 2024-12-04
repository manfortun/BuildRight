using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class BorderContainer : LayoutWithChildren
{
    public bool HasPointerEvents { get; set; } = false;
    public decimal? Height { get; set; } = default!;
    public string? BackgroundSrc { get; set; } = default!;
}
