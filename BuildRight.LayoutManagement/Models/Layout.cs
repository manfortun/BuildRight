namespace BuildRight.LayoutManagement.Models;

public abstract class Layout
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string? Page { get; set; } = string.Empty;
    public int? Order { get; set; } = default!;
    public string? Type => this.GetType().Name;
}
