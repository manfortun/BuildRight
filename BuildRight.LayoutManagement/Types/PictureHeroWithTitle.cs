using BuildRight.LayoutManagement.Attributes;

namespace BuildRight.LayoutManagement.Types;

public class PictureHeroWithTitle : PictureHero
{
    [DisplayMetadata("Title", InputType = "text")]
    public string? Title { get; set; } = default!;

    [DisplayMetadata("Text color", Placeholder = "\"white\", \"transparent\", \"#fff\", etc.", InputType = "text")]
    public string? TextColor { get; set; } = default!;
}
