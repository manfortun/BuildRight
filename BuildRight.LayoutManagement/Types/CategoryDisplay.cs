using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class CategoryDisplay : Layout
{

    [DisplayMetadata("Items", InputType = "array")]
    public object[] Items { get; set; } = default!;
}
