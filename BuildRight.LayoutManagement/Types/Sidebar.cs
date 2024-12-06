using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class Sidebar : LayoutWithChildren
{
    [DisplayMetadata("Height", InputType = "number")]
    public int? Height { get; set; } = default!;
}
