using BuildRight.LayoutManagement.Attributes;

namespace BuildRight.LayoutManagement.Types;

public class ServiceHighlightTitleWithLink : ServiceHighlightTitle
{
    [DisplayMetadata("Link", InputType = "text")]
    public string? Href { get; set; } = default!;
}
