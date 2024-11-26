using AutoMapper;
using BuildRight.ContentManagement.DataAccess;
using BuildRight.ContentManagement.DTOs;
using BuildRight.ContentManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace BuildRight.ContentManagement.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly UnitOfWork _unitOfWork;
    private readonly ProductService _productService;
    private readonly RatingService _ratingService;
    private readonly IMapper _mapper;

    public ProductsController(
        AppDbContext context,
        ProductService productService,
        RatingService ratingService,
        IMapper mapper)
    {
        _unitOfWork = new UnitOfWork(context);
        _productService = productService;
        _ratingService = ratingService;
        _mapper = mapper;
    }

    /// <summary>
    /// Products that have newly arrived
    /// </summary>
    /// <returns></returns>
    [HttpGet(nameof(NewArrivals))]
    public IActionResult NewArrivals()
    {
        var newArrivals = _productService.GetNewArrivals();

        if (!newArrivals.Any())
        {
            return NoContent();
        }

        var products = _mapper.Map<List<ProductRead>>(newArrivals);

        /// obtain the average rating of each obtained product
        foreach (var product in products)
        {
            product.AverageRating = _ratingService.GetAverageRating(_unitOfWork.Products, product.Id);
        }

        return Ok(new { products });
    }
}
