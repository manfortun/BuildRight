using BuildRight.LayoutManagement.Models;

namespace BuildRight.LayoutManagement.Types;

public class FloatingInput : Layout
{
    public string InputType { get; set; } = "text";
    public string Value { get; set; } = default!;
    public string? InputId { get; set; } = default!;
    public bool Required { get; set; } = false;
    public string? Placeholder { get; set; } = default!;
}
