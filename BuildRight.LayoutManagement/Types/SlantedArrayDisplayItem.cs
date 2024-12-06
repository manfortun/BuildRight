using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class SlantedArrayDisplayItem : Layout
{
    [DisplayMetadata("Title", InputType = "text")]
    public string? PrimaryText { get; set; } = default!;

    [DisplayMetadata("Description", InputType = "text")]
    public string? SecondaryText { get; set; } = default!;

    [DisplayMetadata("Background image", InputType = "file")]
    public string? Src { get; set; } = default!;
}
