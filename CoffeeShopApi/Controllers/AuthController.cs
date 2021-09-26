using CoffeeShopApi.Auth;
using CoffeeShopApi.DataAccess;
using CoffeeShopApi.Entities;
using CoffeeShopApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CoffeeShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private ApplicationContext _db;
        private readonly IOptions<AuthOptions> authOptions;

        public AuthController(ApplicationContext context,IOptions<AuthOptions> authOptions)
        {
            this._db = context;
            this.authOptions = authOptions;
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody] LoginModel login)
        {
            var acc = this._db.Accounts.Where(acc => acc.Email == login.Email && acc.Password == login.Password).Include(acc=> acc.Roles).FirstOrDefault();
            
            if (acc != null)
            {
                var token = this.GenerateJWT(acc);
                return Ok(new
                {
                    access_token= token
                });
            }
            else
            {
                return Unauthorized();
            }
            
        }

        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] LoginModel user)
        {
            if (this._db.Accounts.Where(acc => acc.Email == user.Email).FirstOrDefault() == null)
            {
                this._db.Accounts.Add(new Account() { Email = user.Email, Password = user.Password, Roles = new List<Role>() { new Role() { Value= RoleEnum.User.ToString() } } });
                this._db.SaveChanges();
                var acc = this._db.Accounts.Where(acc => acc.Email == user.Email).Include(acc=>acc.Roles).FirstOrDefault();
                var token = this.GenerateJWT(acc);
                return Ok(new
                {
                    access_token = token
                });
            }
            return BadRequest();
        }

        private string GenerateJWT(Account account)
        {
            var authParams = authOptions.Value;

            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email,account.Email),
                new Claim(JwtRegisteredClaimNames.Sub,account.Id.ToString())
            };
            if (account.Roles != null)
            {
                foreach (var role in account.Roles)
                {
                    claims.Add(new Claim("role", role.Value));
                }

            }
            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
