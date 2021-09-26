using CoffeeShopApi.DataAccess;
using CoffeeShopApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CoffeeShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private ApplicationContext _db;
        private int UserId => Int32.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
        public OrdersController(ApplicationContext context)
        {
            this._db = context;
        }

        [Authorize]
        [HttpGet]
        public JsonResult GetOrders()
        {
            return new JsonResult(
                this._db.Orders.Include(o => o.User)
                .Where(o => o.User.Id == this.UserId)
                .Include(o => o.CoffeeProducts)
                .Select(o => new { Email = o.User.Email, Date=o.Date, CoffeeProducts=o.CoffeeProducts })
                .ToList()
                );
        }

        [Authorize]
        [HttpPost]
        public JsonResult PostOrder([FromBody] int[] productsIds)
        {
            if (productsIds.Length > 0)
            {
                Order order = new Order()
                {
                    User = this._db.Accounts.Where(acc => acc.Id == this.UserId).SingleOrDefault(),
                    Date = DateTime.Now,
                    ProductOrders = new List<ProductOrder>()
                };
                var CoffeeProducts = this._db.CoffeeProducts.Where(coffee => productsIds.Contains(coffee.Id)).ToList();               

                foreach (var coffee in CoffeeProducts)
                {
                    order.ProductOrders.Add(new ProductOrder {
                        Order = order,
                        CoffeeProduct = coffee,
                        Count = productsIds.Count((pid) => pid == coffee.Id) 
                    });
                }
                this._db.Orders.Add(order);
                return new JsonResult(this._db.SaveChanges());
            }
            return new JsonResult(BadRequest());
        }
    }
}
