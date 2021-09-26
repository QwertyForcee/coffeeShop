using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeShopApi.Entities
{
    public class ProductOrder
    {
        public int CoffeeProductId { get; set; }
        public CoffeeProduct CoffeeProduct { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int Count { get; set; }
    }
}
