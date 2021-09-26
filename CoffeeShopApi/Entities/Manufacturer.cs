using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeShopApi.Entities
{
    public class Manufacturer
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(70)]
        public string Name { get; set; }
        public List<CoffeeProduct> CoffeeProducts { get; set; }
    }
}
