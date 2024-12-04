using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class CategoryDisplay : Layout
{
    public object[] Items { get; set; } = default!;
}
