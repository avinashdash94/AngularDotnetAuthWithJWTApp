using GleasonWebAPI.Models;
using GleasonWebAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GleasonWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUsersRepository _users;
        private readonly IUserLoginRepository _usersLogin;
        private readonly JwtSettings jwtSettings;
        public AccountController(JwtSettings jwtSettings, IUsersRepository users, IUserLoginRepository usersLogin)
        {
            this.jwtSettings = jwtSettings;
            _users = users ??
                throw new ArgumentNullException(nameof(users));
            _usersLogin = usersLogin ??
                throw new ArgumentNullException(nameof(users));
        }
        private IEnumerable<User> logins = new List<User>() {
            new User() {
                    UserID = 1,
                        Email = "adminakp@gmail.com",
                        UserName = "Admin",
                        Password = "Admin",
                },
                new User() {
                    UserID = 2,
                        Email = "adminakp@gmail.com",
                        UserName = "User1",
                        Password = "Admin",
                }
        };
        //[EnableCors("GleasonAllowOrigin")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]UserLogins userLogins)
        {
            try
            {
                var Token = new UserTokens();
                //var Valid = logins.Any(x => x.UserName.Equals(userLogins.UserName, StringComparison.OrdinalIgnoreCase));
                var Valid =  await _usersLogin.IsValidUser(userLogins);
                if (Valid)
                {
                    //var user = logins.FirstOrDefault(x => x.UserName.Equals(userLogins.UserName, StringComparison.OrdinalIgnoreCase));
                    User user = await _usersLogin.GetUserByUserName(userLogins);
                    Token = JwtHelpers.JwtHelpers.GenTokenkey(new UserTokens()
                    {
                        EmailId = user.Email,
                        GuidId = Guid.NewGuid(),
                        UserName = user.UserName,
                        Id = user.UserID,
                    }, jwtSettings);
                }
                else
                {
                    return BadRequest($"wrong password");
                }
                return Ok(Token);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        /// <summary>
        /// Get List of UserAccounts
        /// </summary>
        /// <returns>List Of UserAccounts</returns>
        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetList()
        {
            return Ok(logins);
        }
    }
}
