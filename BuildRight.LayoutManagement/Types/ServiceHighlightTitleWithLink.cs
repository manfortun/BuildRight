using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class ServiceHighlightTitleWithLink : ServiceHighlightTitle
{
    public string? Href { get; set; } = default!;
}
