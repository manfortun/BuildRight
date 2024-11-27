using System.ComponentModel.DataAnnotations;

namespace BuildRight.LayoutManagement.Models;

public class Layout
{
    [Required] public string Name { get; set; } = string.Empty;
    [Key] public int Order { get; set; } = 0;
    public int? ContentKey { get; set; } = default!;
    public string BackgroundKey { get; set; } = string.Empty;
    public virtual IEnumerable<Layout> Children { get; set; } = default!;
}
