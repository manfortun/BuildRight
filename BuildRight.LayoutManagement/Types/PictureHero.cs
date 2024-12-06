using BuildRight.LayoutManagement.Attributes;

namespace BuildRight.LayoutManagement.Types;

public class PictureHero : Hero
{
    [DisplayMetadata("Alternative text", InputType = "text")]
    public string? Alt { get; set; } = default!;

    [DisplayMetadata("Image source", InputType = "file")]
    public string? Src { get; set; } = default!;
}
