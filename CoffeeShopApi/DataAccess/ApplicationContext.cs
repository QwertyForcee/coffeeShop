using CoffeeShopApi.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeShopApi.DataAccess
{
    public class ApplicationContext:DbContext
    {
        public DbSet<CoffeeProduct> CoffeeProducts { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Order> Orders { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .HasMany(o => o.CoffeeProducts)
                .WithMany(c => c.Orders)
                .UsingEntity<ProductOrder>(
                    po =>
                        po.HasOne(po => po.CoffeeProduct)
                        .WithMany(c => c.ProductOrders)
                        .HasForeignKey(po => po.CoffeeProductId),
                    po =>
                        po.HasOne(po => po.Order)
                        .WithMany(o => o.ProductOrders)
                        .HasForeignKey(po => po.OrderId)

                );
        }
    }
}
