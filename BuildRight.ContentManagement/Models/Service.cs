using BuildRight.ContentManagement.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace BuildRight.ContentManagement.Models;

public class Service : IObject, IDirectory
{
    [Key] public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsClickable { get; set; } = false;
    public string URL { get; set; } = string.Empty;
}
