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
        var layouts = _layoutService.GetLayoutList(request);
        var test = _responseUtil.AsPropertyList(layouts.ToArray());

        return layouts.Any() ? Ok(new { layouts = test }) : NoContent();
    }

    [HttpGet("{page}")]
    public IActionResult PageLayout(string page)
    {
        Layout[] layouts = [.. _layoutService.GetPage(page)];
        var test = _responseUtil.ToOutput(layouts);

        return Ok(new { layouts = test });
    }

    [HttpGet("elements/{id}")]
    public IActionResult ElementById(string id)
    {
        Layout? layout = _layoutService.GetElement(id);

        return layout is null ? NotFound() : Ok(new { layout = _responseUtil.ToOutput(layout).First() });
    }

    [HttpPost]
    public async Task<IActionResult> UpsertLayout(LayoutAddRequest request)
    {
        if (!string.IsNullOrEmpty(request.ParentId))
        {
            await _layoutService.AddChildAsync(request);
        }
        else
        {
            await _layoutService.UpsertLayoutAsync(request);
        }

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLayout(string id)
    {
        await _layoutService.DeleteElementAsync(id);

        return Ok();
    }
}
