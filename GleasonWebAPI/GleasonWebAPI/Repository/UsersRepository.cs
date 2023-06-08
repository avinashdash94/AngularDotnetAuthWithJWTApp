using GleasonWebAPI.Models;
using GleasonWebAPI.Utility;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GleasonWebAPI.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private readonly APIDbContext _appDBContext;
        public UsersRepository(APIDbContext context)
        {
            _appDBContext = context ??
                throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _appDBContext.Users.ToListAsync();
        }

        public async Task<User> GetUserByID(int ID)
        {
            return await _appDBContext.Users.FindAsync(ID);
        }

        public async Task<User> InsertUser(User objDepartment)
        {
            _appDBContext.Users.Add(objDepartment);
            await _appDBContext.SaveChangesAsync();
            return objDepartment;
        }

        public async Task<User> UpdateUser(User objDepartment)
        {
            _appDBContext.Entry(objDepartment).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return objDepartment;
        }
        public bool DeleteUser(int ID)
        {
            bool result = false;
            var department = _appDBContext.Users.Find(ID);
            if (department != null)
            {
                _appDBContext.Entry(department).State = EntityState.Deleted;
                _appDBContext.SaveChanges();
                result = true;
            }
            else
            {
                result = false;
            }
            return result;
        }

    }
}
