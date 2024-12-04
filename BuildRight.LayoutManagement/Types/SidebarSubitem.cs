using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class SidebarSubitem : Layout
{
    public string? Title { get; set; } = default!;
    public string? Description { get; set; } = default!;
    public string? Href { get; set; } = default!;
}
