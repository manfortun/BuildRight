using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class ArrayDisplay : Layout
{
    public int? NoOfColumns { get; set; } = default!;
    public int? Gap { get; set; } = default!;
}
