namespace BuildRight.ContentManagement.Models.Interfaces;

public interface IRatableEntity
{
    IEnumerable<Rating> Ratings { get; set; }
}
