using BuildRight.LayoutManagement.RequestDTOs;
using BuildRight.LayoutManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace BuildRight.LayoutManagement.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LayoutController : ControllerBase
{
    private readonly LayoutService _layoutService;

    public LayoutController(LayoutService layoutService)
    {
        _layoutService = layoutService;
    }

    [HttpPost(nameof(Layouts))]
    public IActionResult Layouts([FromBody] LayoutRequest request)
    {
        var layouts = _layoutService.GetLayouts(request);

        return layouts.Any() ? Ok(new { layouts }) : NoContent();
    }
}
