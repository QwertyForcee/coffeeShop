using CoffeeShopApi.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeShopApi.Models
{
    //public class CoffeeProductExtention
    //{
    //    public static IQueryable<CoffeeProduct> ToCoffeeModel(this IQueryable<CoffeeProduct> data)
    //    {
    //        return data.Select(c =>
    //        {
    //            new CoffeeProductModel()
    //            {
                    //Name = c.Name,
                    //Description = c.Description,
                    //IsGrounded = c.IsGrounded,
                    //Price = c.Price,
                    //RoastType = c.RoastType,
                    //CountryId = c.CountryId,
                    //ManufacturerId = c.ManufacturerId,
                    //Image = 
    //            }
    //        })
    //    }
    //}
    public class CoffeeProductModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        public string ImageName { get; set; }
        public int? ManufacturerId { get; set; }

        public string Manufacturer { get; set; }
        public string RoastType { get; set; }
        public int? CountryId { get; set; }
        public string Country { get; set; }

        public bool IsGrounded { get; set; }
    }
}
