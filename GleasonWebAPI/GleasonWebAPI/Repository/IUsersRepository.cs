using GleasonWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GleasonWebAPI.Repository
{
    public interface IUsersRepository
    {
        public Task<IEnumerable<User>> GetAllUsers();
        public Task<User> GetUserByID(int ID);
        public Task<User> InsertUser(User objDepartment);
        public Task<User> UpdateUser(User objDepartment);
        public bool DeleteUser(int ID);
    }
}
