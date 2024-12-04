using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class PromoBar : Layout
{
    public string? Content { get; set; }
    public string? Src { get; set; } = default!;
    public bool HasPointerEvents { get; set; } = false;
}
