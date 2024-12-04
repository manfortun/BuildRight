using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class ProductDisplay : Layout
{
    public object? Product { get; set; } = default!;
}
