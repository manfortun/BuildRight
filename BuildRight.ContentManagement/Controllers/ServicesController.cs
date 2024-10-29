using BuildRight.ContentManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace BuildRight.ContentManagement.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly ContentService _contentService;
    private readonly PromoService _promoService;

    public ServicesController(ContentService contentService, PromoService promoService)
    {
        _contentService = contentService;
        _promoService = promoService;
    }

    [HttpGet(nameof(LandingPage))]
    public IActionResult LandingPage()
    {
        // get primary services
        var primaryServices = _contentService.GetPrimaryServices();
        var usps = _contentService.GetUSPs();
        var promotions = _promoService.GetActivePromos();

        return Ok(new
        {
            primaryServices,
            usps,
            promotions
        });
    }

    [HttpGet]
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
