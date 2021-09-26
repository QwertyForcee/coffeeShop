using CoffeeShopApi.DataAccess;
using CoffeeShopApi.DataAccess.Repositories;
using CoffeeShopApi.Entities;
using CoffeeShopApi.Interfaces;
using CoffeeShopApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

namespace CoffeeShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoffeeController : ControllerBase
    {
        private ICoffeeRepository _coffee_rep;
        private IFileManager _fileManager;
        private int UserId => Int32.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
        public CoffeeController(ICoffeeRepository  coffee_rep,IFileManager fileManager)
        {
            this._coffee_rep = coffee_rep;
            this._fileManager = fileManager;
        }

        [HttpGet]
        public async Task<JsonResult> GetAsync()
        {
            return new JsonResult(await this._coffee_rep.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> GetAsync(int id)
        {
            return new JsonResult(await this._coffee_rep.GetAsync(id));
        }

        [Route("f/")]
        [HttpGet]
        public async Task<JsonResult> GetAsync([FromQuery] CoffeeFilterParameters filter)
        {
            return new JsonResult(await this._coffee_rep.GetCoffeeFilteredAsync(filter));   
        }

        [Authorize(Roles ="Admin")]
        [HttpPost]
        public async Task<JsonResult> PostAsync([FromForm] IFormFile Image, [FromForm] string Coffee)//[FromForm]IFormFile image,
        {
                var coffee = JsonSerializer.Deserialize<CoffeeProductModel>(Coffee);
                coffee.Image = Image;
                return new JsonResult(await this._coffee_rep.AddAsync(coffee));
        }

        [HttpDelete("{id}")]
        public async Task<int> DeleteAsync(int id)
        {
            return await this._coffee_rep.DeleteAsync(id);
        }

        [HttpPut]
        public async Task<JsonResult> UpdateAsync(CoffeeProductModel entity)
        {
            return new JsonResult(await this.UpdateAsync(entity));
        }

        
    }
}
