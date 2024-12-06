using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class ServiceHighlightTitle : Layout
{
    [DisplayMetadata("Label", InputType = "text")]
    public string? Label { get; set; } = default!;

    [DisplayMetadata("Description", InputType = "text")]
    public string? Description { get; set; } = default!;

    [DisplayMetadata("Height", InputType = "number")]
    public decimal? Height { get; set; } = default!;

    [DisplayMetadata("Background image", InputType = "file")]
    public string? BackgroundSrc { get; set; } = default!;
}
