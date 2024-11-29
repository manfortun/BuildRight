using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class ServiceHighlightTitle : Layout
{
    public string? Label { get; set; } = default!;
    public string? Description { get; set; } = default!;
    public decimal? Height { get; set; } = default!;
    public string? BackgroundSrc { get; set; } = default!;
}
