using CoffeeShopApi.DataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CoffeeShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private int AccountId => Int32.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
        private ApplicationContext _db;
        public AccountsController(ApplicationContext context)
        {
            this._db = context;
        }

        [Authorize]
        [HttpGet]
        public JsonResult GetAccount()
        {
            return new JsonResult(this._db.Accounts.Where(a => a.Id == this.AccountId).Include(a=> a.Roles).Select(a=> new {Id=a.Id,Email=a.Email,Roles=a.Roles.Select(r=>r.Value).ToList() }).FirstOrDefault());
        }
    }
}
