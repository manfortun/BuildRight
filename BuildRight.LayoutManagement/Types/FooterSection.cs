using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class FooterSection : LayoutWithChildren
{

    [DisplayMetadata("Title", InputType = "text")]
    public string? Title { get; set; } = default!;
}
