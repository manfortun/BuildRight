using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class SlantedArrayDisplayItem : Layout
{
    public string? PrimaryText { get; set; } = default!;
    public string? SecondaryText { get; set; } = default!;
    public string? Src { get; set; } = default!;
}
