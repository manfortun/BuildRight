using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class ArrayDisplay : LayoutWithChildren
{
    public int? NoOfColumns { get; set; } = default!;
    public int? MaxItems { get; set; } = default!;
    public int? Gap { get; set; } = default!;
}
