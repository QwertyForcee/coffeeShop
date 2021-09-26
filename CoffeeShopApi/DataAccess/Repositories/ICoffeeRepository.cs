using CoffeeShopApi.Entities;
using CoffeeShopApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeShopApi.DataAccess.Repositories
{
    public interface ICoffeeRepository : IRepository<CoffeeProduct,CoffeeProductModel>
    {
        Task<List<CoffeeProductModel>> GetCoffeeFilteredAsync(CoffeeFilterParameters filter);
    }
}
