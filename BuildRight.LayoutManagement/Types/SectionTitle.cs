using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class SectionTitle : Layout
{
    [DisplayMetadata("Label", InputType = "text")]

    public string? Label { get; set; } = default!;
}
