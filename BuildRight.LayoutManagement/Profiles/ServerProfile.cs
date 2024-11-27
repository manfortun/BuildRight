using BuildRight.LayoutManagement.Models;
using BuildRight.LayoutManagement.Types.Interfaces;

namespace BuildRight.LayoutManagement.Profiles;

public class ServerProfile : AutoMapper.Profile
{
    public ServerProfile()
    {
        CreateMap<ILayout, Layout>()
            .ForMember(layout => layout.Name, opt => opt.MapFrom(src => src.GetType().Name));
    }
}
