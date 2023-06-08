using GleasonWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GleasonWebAPI.Repository
{
     public interface IUserLoginRepository
    {
        public Task<bool> IsValidUser(UserLogins userLogins);
        public Task<User> GetUserByUserName(UserLogins userLogins);
    }
}
