using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class SidebarPopupItem : LayoutWithChildren
{
    [DisplayMetadata("Title", InputType = "text")]
    public string? Title { get; set; } = default!;

    [DisplayMetadata("Description", InputType = "text")]
    public string? Description { get; set; } = default!;

    [DisplayMetadata("Link", InputType = "text")]
    public string? Href { get; set; } = default!;
}
