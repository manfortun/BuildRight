using BuildRight.ContentManagement.DataAccess;
using BuildRight.ContentManagement.Models;

namespace BuildRight.ContentManagement.Services;

public class PartnerService
{
    private readonly UnitOfWork _unitOfWork;

    public PartnerService(AppDbContext context)
    {
        _unitOfWork = new UnitOfWork(context);
    }

    public IEnumerable<Partner> GetPartners()
    {
        var partners = _unitOfWork.Partners.GetAll();

        if (!partners.Any())
        {
            return [];
        }

        return partners;
    }
}
