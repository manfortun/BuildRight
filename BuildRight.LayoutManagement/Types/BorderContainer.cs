using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class BorderContainer : LayoutWithChildren
{
    [DisplayMetadata("Is clickable", InputType = "boolean")]
    public bool HasPointerEvents { get; set; } = false;

    [DisplayMetadata("Height", InputType = "number")]
    public int? Height { get; set; } = default!;

    [DisplayMetadata("Background Image", InputType = "file")]
    public string? BackgroundSrc { get; set; } = default!;
}
