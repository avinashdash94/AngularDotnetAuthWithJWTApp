using GleasonWebAPI.Models;
using GleasonWebAPI.Utility;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GleasonWebAPI.Repository
{
    public class UserLoginRepository : IUserLoginRepository
    {
        private readonly APIDbContext _appDBContext;
        public UserLoginRepository(APIDbContext context)
        {
            _appDBContext = context ??
                throw new ArgumentNullException(nameof(context));
        }
        public async Task<bool> IsValidUser(UserLogins userLogins)
        {
            bool result = false;
            result = await _appDBContext.Users.AnyAsync(x => x.UserName.ToLower() == userLogins.UserName.ToLower());
            return result;
        }

        public async Task<User> GetUserByUserName(UserLogins userLogins)
        {
            return await _appDBContext.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == userLogins.UserName.ToLower());
        }

    }
}
