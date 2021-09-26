using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeShopApi.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public Account User{ get; set; }
        public List<CoffeeProduct> CoffeeProducts{ get; set; }
        public List<ProductOrder> ProductOrders { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

    }
}
