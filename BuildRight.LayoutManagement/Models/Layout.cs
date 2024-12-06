using BuildRight.LayoutManagement.Attributes;

namespace BuildRight.LayoutManagement.Models;

public abstract class Layout
{
    [DisplayMetadata("ID", InputType = "text", CanWrite = false)]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [DisplayMetadata("Page", InputType = "text", Placeholder = "Leave empty if parent is not page.")]
    public string? Page { get; set; } = string.Empty;

    [DisplayMetadata("Order", InputType = "number")]
    public int? Order { get; set; } = default!;

    [DisplayMetadata("Type", InputType = "text", CanWrite = false)]
    public string? Type => this.GetType().Name;
}
