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
    private readonly ResponseUtil _responseUtil;

    public LayoutController(LayoutService layoutService, ResponseUtil responseUtil)
    {
        _layoutService = layoutService;
        _responseUtil = responseUtil;
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
        Layout[] layouts = [.. await _layoutService.GetPage(page)];
        var test = _responseUtil.ToOutput(layouts);

        return Ok(new { layouts = test });
    }

    [HttpPost]
    public IActionResult UpsertLayout(LayoutAddRequest request)
    {
        _layoutService.UpsertSection(request);

        return Ok();
    }
}
