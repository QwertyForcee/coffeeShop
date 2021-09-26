using CoffeeShopApi.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeeShopApi.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private IFileManager _fileManager;
        public ImageController(IFileManager fileManager)
        {
            _fileManager = fileManager;
        }

        [Route("{imageName}")]
        [HttpGet]
        public IActionResult Get(string imageName)
        {
            string mime = imageName.Substring(imageName.LastIndexOf('.') + 1);
            return new FileStreamResult(this._fileManager.ImageStream(imageName), $"image/{mime}");
        }
    }
}
