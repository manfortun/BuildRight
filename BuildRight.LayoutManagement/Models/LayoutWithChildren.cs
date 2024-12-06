using BuildRight.LayoutManagement.Attributes;

namespace BuildRight.LayoutManagement.Models;

public abstract class LayoutWithChildren : Layout
{
    [DisplayMetadata("Children", InputType = "null", CanWrite = false)]
    public IEnumerable<Layout> Children { get; set; } = default!;
}
