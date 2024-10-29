
using BuildRight.ContentManagement.DataAccess;
using BuildRight.ContentManagement.Models;

namespace BuildRight.ContentManagement.Services;

public class ContentService
{
    private readonly UnitOfWork _unitOfWork;

    public ContentService(AppDbContext context)
    {
        _unitOfWork = new UnitOfWork(context);
    }

    public IEnumerable<Service> GetPrimaryServices()
    {
        var primaryServices = _unitOfWork.Services.GetAll();

        return primaryServices;
    }

    public IEnumerable<USP> GetUSPs()
    {
        var usps = _unitOfWork.USPs.GetAll();

        return usps;
    }
}
