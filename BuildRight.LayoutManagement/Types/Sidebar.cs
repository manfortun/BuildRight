using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class Sidebar : LayoutWithChildren
{
    public int? Height { get; set; } = default!;
}
