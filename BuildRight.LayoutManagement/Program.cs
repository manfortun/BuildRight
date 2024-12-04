using BuildRight.LayoutManagement.DataAccess;
using BuildRight.LayoutManagement.Models;
using BuildRight.LayoutManagement.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Reflection;

namespace BuildRight.LayoutManagement
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

            builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));

            builder.Services.AddSingleton<IMongoClient, MongoClient>(sp =>
            {
                var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
                return new MongoClient(settings.ConnectionString);
            });

            builder.Services
                .AddSingleton<TypeProvider<Layout>>()
                .AddTransient<LayoutService>()
                .AddTransient<LayoutRepository>()
                .AddTransient<JsonToLayoutService>()
                .AddTransient<ResponseUtil>();

            builder.Services.AddCors(options =>
            {
                string[] allowedOrigins = [.. builder.Configuration
                    .GetSection("AllowedOrigins")
                    .GetChildren()
                    .Select(c => c.Value)];

                options.AddPolicy("AllowSpecificOrigin",
                    builder =>
                    {
                        builder.WithOrigins(allowedOrigins)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                    });
            });

            builder.Services.AddAuthorization();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseCors("AllowSpecificOrigin");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
