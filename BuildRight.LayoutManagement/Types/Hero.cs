using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class Hero : LayoutWithChildren
{
    public int? Height { get; set; } = default!;
}
