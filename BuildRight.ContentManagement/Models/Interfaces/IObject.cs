
namespace BuildRight.ContentManagement.Models.Interfaces;

public interface IObject
{
    /// <summary>Determines if an action can be performed by clicking the object</summary>
    bool IsClickable { get; set; }
}
