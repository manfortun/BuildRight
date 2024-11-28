using BuildRight.LayoutManagement.Models;
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

    [HttpPost(nameof(Types))]
    public IActionResult Layouts([FromBody] LayoutGetRequest request)
    {
        var layouts = _layoutService.GetLayouts(request);

        return layouts.Any() ? Ok(new { layouts }) : NoContent();
    }

    [HttpGet("{page}")]
    public async Task<IActionResult> PageLayout(string page)
    {
        List<Layout> layouts = (await _layoutService.GetPage(page)).ToList();

        return Ok(new { layouts });
    }

    [HttpPost]
    public IActionResult UpsertLayout(LayoutAddRequest request)
    {
        _layoutService.UpsertSection(request);

        return Ok();
    }
}
