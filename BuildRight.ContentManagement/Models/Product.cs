using BuildRight.ContentManagement.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace BuildRight.ContentManagement.Models;

public class Product : IRatableEntity, IObject
{
    [Key] public int Id { get; set; }
    [Required] public string Title { get; set; } = string.Empty;
    [Required] public decimal Price { get; set; } = 0;
    [Required] public required DateTime DateAdded { get; set; } = DateTime.Now;
    public bool IsClickable { get; set; } = true;
    public virtual IEnumerable<Category> Categories { get; set; } = default!;
    public virtual IEnumerable<Rating> Ratings { get; set; } = default!;
}
