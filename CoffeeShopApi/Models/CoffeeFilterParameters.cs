using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeShopApi.Models
{
    public class CoffeeFilterParameters
    {
        public double MinPrice { get; set; } = 0;
        public double MaxPrice { get; set; } = Double.MaxValue;
        public string RoastType { get; set; } = null;
        public bool? IsGrounded { get; set; } = null;
        public string Manufacturer { get; set; } = null;
        public string Country { get; set; } = null;
    }
    public class PriceParameters
    {
        public double MinPrice { get; set; }
        public double MaxPrice { get; set; }
        public string Country { get; set; }
    }
}
