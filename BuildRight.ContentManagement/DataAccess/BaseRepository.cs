using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BuildRight.ContentManagement.DataAccess;

public class BaseRepository<Entity> where Entity : class
{
    protected readonly DbSet<Entity> _dbSet;
    protected readonly DbContext _context;

    public BaseRepository(DbContext context)
    {
        _context = context;
        _dbSet = context.Set<Entity>();
    }

    public virtual Entity? Get(object id)
    {
        return _dbSet.Find(id);
    }

    public virtual IEnumerable<Entity> GetAll(Expression<Func<Entity, bool>>? predicate = null)
    {
        var set = _dbSet.AsQueryable();

        if (predicate is not null)
        {
            set = set.Where(predicate);
        }

        return [.. set];
    }

    public virtual Entity? FirstOrDefault(Expression<Func<Entity, bool>>? predicate = null)
    {
        return this.GetAll().FirstOrDefault();
    }

    public virtual void Insert(Entity entity)
    {
        _dbSet.Add(entity);
    }

    public virtual void Update(Entity entity)
    {
        _dbSet.Update(entity);
    }

    public virtual void Delete(Entity entity)
    {
        if (_context.Entry(entity).State == EntityState.Detached)
        {
            _dbSet.Attach(entity);
        }

        _dbSet.Remove(entity);
    }

    public virtual void Delete(object id)
    {
        var entity = this.Get(id);

        if (entity is not null)
        {
            this.Delete(entity);
        }
    }
}
