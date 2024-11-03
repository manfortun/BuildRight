using BuildRight.ContentManagement.DTOs;
using BuildRight.ContentManagement.Models;

namespace BuildRight.ContentManagement.Profile;

public class ServerProfile : AutoMapper.Profile
{
    public ServerProfile()
    {
        CreateMap<Category, CategoryRead>();
        CreateMap<Product, ProductRead>();
    }
}
