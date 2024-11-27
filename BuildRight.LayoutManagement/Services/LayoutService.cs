using AutoMapper;
using BuildRight.LayoutManagement.Models;
using BuildRight.LayoutManagement.RequestDTOs;
using BuildRight.LayoutManagement.Types.Interfaces;

namespace BuildRight.LayoutManagement.Services;

public class LayoutService
{
    private readonly LayoutProvider _layoutProvider;
    private readonly IMapper _mapper;

    public LayoutService(LayoutProvider layoutProvider, IMapper mapper)
    {
        _layoutProvider = layoutProvider;
        _mapper = mapper;
    }

    public IEnumerable<Layout> GetLayouts(LayoutRequest request)
    {
        var layouts = _layoutProvider.Types;

        if (!string.IsNullOrEmpty(request.Name))
        {
            layouts = layouts.Intersect(_layoutProvider.Types.Where(t => t.Name.Equals(request.Name)));
        }

        if (!string.IsNullOrEmpty(request.Type))
        {
            throw new NotImplementedException();
        }

        if (layouts.Any())
        {
            var layoutTypes = layouts
                .Select(l => Activator.CreateInstance(l) as ILayout)
                .OfType<ILayout>();

            return _mapper.Map<IEnumerable<Layout>>(layoutTypes);
        }

        return [];
    }
}
