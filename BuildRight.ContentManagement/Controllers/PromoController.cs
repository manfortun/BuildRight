using BuildRight.ContentManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace BuildRight.ContentManagement.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PromoController : ControllerBase
{
    private readonly PromoService _promoService;

    public PromoController(PromoService promoService)
    {
        _promoService = promoService;
    }

    /// <summary>
    /// The promotions.
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public IActionResult Promos()
    {
        var promotions = _promoService.GetActivePromos();

        if (!promotions.Any())
        {
            return NoContent();
        }

        return Ok(new { promotions });
    }
}
