using CoffeeShopApi.Entities;
using CoffeeShopApi.Interfaces;
using CoffeeShopApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeShopApi.DataAccess.Repositories
{
    public class CoffeeRepository : ICoffeeRepository
    {
        private ApplicationContext _db;
        private IFileManager _fileManager;
        public CoffeeRepository(ApplicationContext context,IFileManager fileManager)
        {
            this._db = context;
            this._fileManager = fileManager;
        }

        public async Task<int> AddAsync(CoffeeProductModel entity)
        {
            CoffeeProduct coffeeProduct = new CoffeeProduct()
            {
                Name = entity.Name,
                Description = entity.Description,
                ImagePath = await this._fileManager.SaveImage(entity.Image),
                IsGrounded = entity.IsGrounded,
                Price = entity.Price,
                RoastType = entity.RoastType,

                Country = await this._db.Countries.Where(c=>c.Name==entity.Country).FirstOrDefaultAsync(),
                //CountryId = coffee.CountryId,
                Manufacturer = await this._db.Manufacturers.Where(m=>m.Name==entity.Manufacturer).FirstOrDefaultAsync(),
                //ManufacturerId = coffee.ManufacturerId
            };

            this._db.CoffeeProducts.Add(coffeeProduct);
            return await this._db.SaveChangesAsync();
        }

        public async Task<int> DeleteAsync(int id)
        {
            var coffeeProduct = await this._db.CoffeeProducts.FindAsync(id);

            this._db.CoffeeProducts.Remove(coffeeProduct);
            return await this._db.SaveChangesAsync();
        }

        public async Task<CoffeeProductModel> UpdateAsync(CoffeeProductModel entity)
        {
            CoffeeProduct coffeeProduct = new CoffeeProduct()
            {
                Id = (int)entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                ImagePath = await this._fileManager.SaveImage(entity.Image),
                IsGrounded = entity.IsGrounded,
                Price = entity.Price,
                RoastType = entity.RoastType,

                Country = await this._db.Countries.Where(c => c.Name == entity.Country).FirstOrDefaultAsync(),
                //CountryId = coffee.CountryId,
                Manufacturer = await this._db.Manufacturers.Where(m => m.Name == entity.Manufacturer).FirstOrDefaultAsync(),
                //ManufacturerId = coffee.ManufacturerId
            };
            this._db.CoffeeProducts.Update(coffeeProduct);
            await this._db.SaveChangesAsync();
            return entity;
        }

        public async Task<List<CoffeeProductModel>> GetAllAsync()
        {
            return await this._db.CoffeeProducts
                .Include(c => c.Country)
                .Include(c => c.Manufacturer)
                .Select(c =>
                    new CoffeeProductModel()
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Description = c.Description,
                        IsGrounded = c.IsGrounded,
                        Price = c.Price,
                        RoastType = c.RoastType,
                        CountryId = c.CountryId,
                        ManufacturerId = c.ManufacturerId,
                        ImageName = c.ImagePath,
                        Manufacturer = c.Manufacturer.Name,
                        Country = c.Country.Name
                    }
                )
                .ToListAsync();
        }

        public async Task<CoffeeProductModel> GetAsync(int id)
        {
            var cp = await this._db.CoffeeProducts.FindAsync(id);
            return new CoffeeProductModel()
            {
                Id = cp.Id,
                Name = cp.Name,
                Description = cp.Description,
                IsGrounded = cp.IsGrounded,
                Price = cp.Price,
                RoastType = cp.RoastType,
                CountryId = cp.CountryId,
                ManufacturerId = cp.ManufacturerId,
                ImageName = cp.ImagePath,
                Manufacturer = cp.Manufacturer.Name,
                Country = cp.Country.Name
            };
        }

        public async Task<List<CoffeeProductModel>> GetCoffeeFilteredAsync(CoffeeFilterParameters filter)
        {

            return await this._db.CoffeeProducts
                .Include(c => c.Country)
                .Include(c => c.Manufacturer)
                .Select(c =>
                    new CoffeeProductModel()
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Description = c.Description,
                        IsGrounded = c.IsGrounded,
                        Price = c.Price,
                        RoastType = c.RoastType,
                        CountryId = c.CountryId,
                        ManufacturerId = c.ManufacturerId,
                        ImageName = c.ImagePath,
                        Manufacturer = c.Manufacturer.Name,
                        Country = c.Country.Name
                    }
                )
                .Where(c =>
                    c.Price < filter.MaxPrice
                    && c.Price > filter.MinPrice
                    && (filter.IsGrounded != null ? c.IsGrounded == filter.IsGrounded : true)
                    && (filter.RoastType != null ? c.RoastType == filter.RoastType : true)
                    && (filter.Country != null ? c.Country == filter.Country : true)
                    && (filter.Manufacturer != null ? c.Manufacturer == filter.Manufacturer : true))
                .ToListAsync();
        }

    }
}
