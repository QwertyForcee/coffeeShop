using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeShopApi.Entities
{
    public class CoffeeProduct:Product
    {
        public int? ManufacturerId { get; set; }

        [ForeignKey("ManufacturerId")]
        public Manufacturer Manufacturer { get; set; }
        public string RoastType { get; set; }
        public int? CountryId { get; set; }

        [ForeignKey("CountryId")]
        public Country Country { get; set; }

        public bool IsGrounded { get; set; }
        public List<Order> Orders { get; set; }
        public List<ProductOrder> ProductOrders { get; set; }
    }
}
