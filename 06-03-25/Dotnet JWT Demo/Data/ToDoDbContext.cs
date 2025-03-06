using Microsoft.EntityFrameworkCore;
using ToDoAPI.Models;

namespace ToDoAPI.Data;

public class ToDoDbContext: DbContext
{
    public ToDoDbContext(DbContextOptions<ToDoDbContext> options): base(options)
    {
    }

    public DbSet<ToDo> Todos { get; set; }
}
