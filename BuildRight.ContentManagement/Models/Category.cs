using System.ComponentModel.DataAnnotations;

namespace BuildRight.ContentManagement.Models;

public class Category
{
    [Key] public int Id { get; set; }
    [Required] public required string Title { get; set; } = string.Empty;
    public virtual IEnumerable<Product> Products { get; set; } = default!;
}
