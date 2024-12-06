using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class Section : LayoutWithChildren
{
    [DisplayMetadata("Background color", Placeholder = "\"white\", \"transparent\", \"#fff\", etc.", InputType = "text")]
    public string? BackgroundColor { get; set; } = default!;
}
