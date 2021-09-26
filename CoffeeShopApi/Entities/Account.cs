using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeShopApi.Entities
{
    public class Account
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Role> Roles { get; set; }
    }
    public class Role
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }
    public enum RoleEnum
    {
        User,
        Admin
    }
}
