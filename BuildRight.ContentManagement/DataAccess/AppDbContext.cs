using BuildRight.ContentManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace BuildRight.ContentManagement.DataAccess;

public class AppDbContext : DbContext
{
    public DbSet<Service> Services { get; set; }
    public DbSet<USP> USPs { get; set; }
    public DbSet<Promo> Promos { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Partner> Partners { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .HasMany(p => p.Categories)
            .WithMany(c => c.Products);

        modelBuilder.Entity<Product>()
            .HasMany(p => p.Ratings)
            .WithMany(r => r.Products);

        base.OnModelCreating(modelBuilder);
    }
}
