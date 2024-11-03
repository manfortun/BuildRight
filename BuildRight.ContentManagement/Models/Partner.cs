using BuildRight.ContentManagement.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace BuildRight.ContentManagement.Models;

public class Partner : IObject, IDirectory
{
    [Key] public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public bool IsClickable { get; set; } = true;
    public string URL { get; set; } = string.Empty;
}
