using BuildRight.LayoutManagement.Attributes;
using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class ArrayDisplay : LayoutWithChildren
{
    [DisplayMetadata("No. of columns", InputType = "number")]
    public int? NoOfColumns { get; set; } = default!;

    [DisplayMetadata("Max items", Placeholder = "Max number of items to display", InputType = "number")]
    public int? MaxItems { get; set; } = default!;

    [DisplayMetadata("Gap", InputType = "number")]
    public int? Gap { get; set; } = default!;
}
