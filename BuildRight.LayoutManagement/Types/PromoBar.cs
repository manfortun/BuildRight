using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class PromoBar : Layout
{
    [DisplayMetadata("Content", InputType = "text")]
    public string? Content { get; set; }

    [DisplayMetadata("Image source", InputType = "file")]
    public string? Src { get; set; } = default!;

    [DisplayMetadata("Is clickable?", InputType = "boolean")]
    public bool HasPointerEvents { get; set; } = false;
}
