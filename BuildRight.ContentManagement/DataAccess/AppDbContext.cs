using BuildRight.ContentManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace BuildRight.ContentManagement.DataAccess;

public class AppDbContext : DbContext
{
    public DbSet<Service> Services { get; set; }
    public DbSet<USP> USPs { get; set; }
    public DbSet<Promo> Promos { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
