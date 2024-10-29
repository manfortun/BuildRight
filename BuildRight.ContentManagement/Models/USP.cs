
using BuildRight.ContentManagement.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace BuildRight.ContentManagement.Models;

public class USP : IObject
{
    [Key] public int Id { get; set; }
    [Required] public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsClickable { get; set; } = false;
}
