using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class ImageWithLink : Layout
{
    public string? Title { get; set; } = default!;
    public string? Src { get; set; } = default!;
    public string? Link { get; set; } = default!;
}
