using System.ComponentModel.DataAnnotations;

namespace BuildRight.ContentManagement.Models;

public class Rating
{
    [Key] public int Id { get; set; }
    [Required] public decimal Rate { get; set; } = 0M;
    public virtual IEnumerable<Product> Products { get; set; } = default!;
}
