using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class FormContainer : LayoutWithChildren
{
    public string? Title { get; set; } = default!;
}
