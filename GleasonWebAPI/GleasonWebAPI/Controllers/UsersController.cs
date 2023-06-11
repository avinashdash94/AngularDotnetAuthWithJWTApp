using GleasonWebAPI.Models;
using GleasonWebAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GleasonWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _users;
        public UsersController(IUsersRepository users)
        {
            _users = users ??
                throw new ArgumentNullException(nameof(users));
        }

        [HttpGet]
        [Route("GetAllUsers")]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _users.GetAllUsers());
        }

        [HttpGet]
        [Route("GetUserById/{Id}")]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUserById(int Id)
        {
            return Ok(await _users.GetUserByID(Id));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddNewUser(User user)
        {
            var result = await _users.InsertUser(user);
            if (result.UserID == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            return Ok("Added Successfully");
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        //[Route("UpdateDepartment")]
        public async Task<IActionResult> UpdateUser(User user)
        {
            await _users.UpdateUser(user);
            return Ok("Updated Successfully");
        }
        [HttpDelete]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        //[HttpDelete("{id}")]
        //[Route("DeleteDepartment")]
        public JsonResult DeleteUser(int id)
        {
            _users.DeleteUser(id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
