using BuildRight.ContentManagement.DataAccess;
using BuildRight.ContentManagement.Models;

namespace BuildRight.ContentManagement.Services;

public class PromoService
{
    private readonly UnitOfWork _unitOfWork;

    public PromoService(AppDbContext context)
    {
        _unitOfWork = new UnitOfWork(context);
    }

    public IEnumerable<Promo> GetActivePromos()
    {
        var activePromos = _unitOfWork.Promos.GetAll(promo => promo.StartDate <= DateTime.Now && promo.EndDate > DateTime.Now);

        return activePromos;
    }
}
