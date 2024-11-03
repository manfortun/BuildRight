using BuildRight.ContentManagement.DataAccess;
using BuildRight.ContentManagement.Models;

namespace BuildRight.ContentManagement.Services;

public class ProductService
{
    private readonly UnitOfWork _unitOfWork;
    /// <summary>
    /// Items are considered new arrival when added since a week ago
    /// </summary>
    private readonly DateTime NEW_ARRIVAL = DateTime.Now.AddDays(-7).Date;

    public ProductService(AppDbContext context)
    {
        _unitOfWork = new UnitOfWork(context);
    }

    public IEnumerable<Product> GetNewArrivals()
    {
        var newArrivals = _unitOfWork.Products.GetAll(p => p.DateAdded >= NEW_ARRIVAL);

        foreach (var arrival in newArrivals)
        {
            yield return arrival;
        }
    }
}
