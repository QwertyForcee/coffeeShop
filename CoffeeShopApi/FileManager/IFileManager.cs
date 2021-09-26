using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeShopApi.Interfaces
{
    public interface IFileManager
    {
        public Task<string> SaveImage(IFormFile image);
        public FileStream ImageStream(string image);
    }
}
