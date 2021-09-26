using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeeShopApi.DataAccess.Repositories
{
    public interface IRepository<T, TM> where T : class 
                                        where TM : class
    {
        Task<List<TM>> GetAllAsync();
        Task<TM> GetAsync(int id);
        Task<int> AddAsync(TM entity);
        Task<TM> UpdateAsync(TM entity);
        Task<int> DeleteAsync(int id);

    }
}
