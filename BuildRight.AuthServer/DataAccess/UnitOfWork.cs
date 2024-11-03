//using BuildRight.AuthServer.Models;

namespace BuildRight.AuthServer.DataAccess;

public class UnitOfWork : IDisposable
{
    private bool _isDisposed = false;
    private readonly AppDbContext _context;
    //private BaseRepository<User> _users = default!;

    //public BaseRepository<User> Users => _users ??= new BaseRepository<User>(_context);

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
