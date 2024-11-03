using BuildRight.ContentManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace BuildRight.ContentManagement.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly ContentService _contentService;
    private readonly PromoService _promoService;
    private readonly PartnerService _partnerService;

    public ServicesController(ContentService contentService, PromoService promoService, PartnerService partnerService)
    {
        _contentService = contentService;
        _promoService = promoService;
        _partnerService = partnerService;
    }

    [HttpGet(nameof(LandingPage))]
    public IActionResult LandingPage()
    {
        // get primary services
        var primaryServices = _contentService.GetPrimaryServices();
        var usps = _contentService.GetUSPs();
        var promotions = _promoService.GetActivePromos();
        var partners = _partnerService.GetPartners();

        return Ok(new
        {
            primaryServices,
            usps,
            promotions,
            partners
        });
    }

    [HttpGet(nameof(PrimaryServices))]
    public IActionResult PrimaryServices()
    {
        var services = _contentService.GetPrimaryServices();

        if (!services.Any())
        {
            return NoContent();
        }

        return Ok(new { primaryServices = services });
    }

}
