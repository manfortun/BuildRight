using BuildRight.ContentManagement.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace BuildRight.ContentManagement.Models;

public class Promo : IObject
{
    [Key] public int Id { get; set; }
    [Required] public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    [Required] public DateTime StartDate { get; set; } = DateTime.MinValue;
    [Required] public DateTime EndDate { get; set; } = DateTime.MinValue;
    public string Image { get; set; } = string.Empty;
    public bool IsClickable { get; set; } = true;
}
