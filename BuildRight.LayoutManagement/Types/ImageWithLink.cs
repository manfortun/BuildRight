using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class ImageWithLink : Layout
{

    [DisplayMetadata("Title", InputType = "text")]
    public string? Title { get; set; } = default!;

    [DisplayMetadata("Image source", InputType = "text")]
    public string? Src { get; set; } = default!;

    [DisplayMetadata("Link",Placeholder = "URL", InputType = "text")]
    public string? Link { get; set; } = default!;
}
