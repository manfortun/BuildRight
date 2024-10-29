﻿
using BuildRight.ContentManagement.Models;

namespace BuildRight.ContentManagement.DataAccess;

public class UnitOfWork : IDisposable
{
    private bool _isDisposed = false;
    private readonly AppDbContext _context;
    private BaseRepository<Service> _services = default!;
    private BaseRepository<USP> _usps = default!;
    private BaseRepository<Promo> _promos = default!;

    public BaseRepository<Service> Services => _services ??= new BaseRepository<Service>(_context);
    public BaseRepository<USP> USPs => _usps ?? new BaseRepository<USP>(_context);
    public BaseRepository<Promo> Promos => _promos ?? new BaseRepository<Promo>(_context);

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
    }

    public virtual void Save()
    {
        _context.SaveChanges();
    }

    public void Dispose(bool disposing)
    {
        if (disposing && !_isDisposed)
        {
            _context.Dispose();
        }

        _isDisposed = true;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
