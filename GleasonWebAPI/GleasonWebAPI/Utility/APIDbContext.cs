using GleasonWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GleasonWebAPI.Utility
{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions<APIDbContext> options) : base(options) {
            Console.WriteLine();
        }
        public DbSet<User> Users
        {
            get;
            set;
        }

        //public DbSet<UserLogins> UserLogins
        //{
        //    get;
        //    set;
        //}

    }
}
