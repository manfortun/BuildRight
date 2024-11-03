using BuildRight.ContentManagement.DataAccess;
using BuildRight.ContentManagement.Models;
using BuildRight.ContentManagement.Models.Interfaces;

namespace BuildRight.ContentManagement.Services;

public class RatingService
{
    public IEnumerable<Rating> GetRating<TEntity>(BaseRepository<TEntity> repository, object key) where TEntity : class, IRatableEntity
    {
        var item = repository.Get(key);

        return item is null ? [] : item.Ratings;
    }

    public decimal GetAverageRating<TEntity>(BaseRepository<TEntity> repository, object key) where TEntity : class, IRatableEntity
    {
        IEnumerable<Rating> ratings = this.GetRating(repository, key);

        if (!ratings.Any())
        {
            return 0;
        }

        decimal averageRating = ratings.Average(r => r.Rate);

        return averageRating;
    }
}
