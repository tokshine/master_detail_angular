using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace master_detail_angular_vs2017.Controllers
{
    [Route("api/[controller]")]
    public class PlaceController : Controller
    {

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return new JsonResult(GetTestData().First(i => i.ID == id), DefaultJsonSettings);
        }

        [HttpGet("GetLatestEntries")]
        public IActionResult GetLatestEntries()
        {
            return GetLatestEntries(DefaultNumberOfItems);
        }

        [HttpGet("GetLatestEntries/{n}")]
        public IActionResult GetLatestEntries(int n)
        {
            var data = GetTestData().OrderByDescending(i => i.CreatedDate).Take(n);
            return new JsonResult(data, DefaultJsonSettings);
        }

        [HttpGet("GetMostViewed")]
        public IActionResult GetMostViewed()
        {
            return GetMostViewed(DefaultNumberOfItems);
        }

        [HttpGet("GetMostViewed/{n}")]
        public IActionResult GetMostViewed(int n)
        {
            if (n > MaxNumberOfItems) n = MaxNumberOfItems;
            var data = GetTestData().OrderByDescending(i => i.ViewCount).Take(n);
            return new JsonResult(data, DefaultJsonSettings);
        }

        private List<PlaceViewModel> GetTestData(int num = 999)
        {
            List<PlaceViewModel> list = new List<PlaceViewModel>();
            DateTime date = DateTime.Now.AddDays(-num);
            for (int id = 1; id <= num; id++)
            {
                list.Add(new PlaceViewModel()
                {
                    ID = id,
                    Name = String.Format("Place {0} Name", id),
                    Location = String.Format("Place {0} Location", id),
                    CreatedDate = date.AddDays(id),
                    LastModifiedDate = date.AddDays(id),
                    ViewCount = num - id
                });
            }
            return list;
        }

        private JsonSerializerSettings DefaultJsonSettings
        {
            get
            {
                return new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                };
            }
        }

        private int DefaultNumberOfItems
        {
            get
            {
                return 5;
            }
        }

        private int MaxNumberOfItems
        {
            get
            {
                return 100;
            }
        }

    }
}

[JsonObject(MemberSerialization.OptOut)]
    internal class PlaceViewModel
    {
        public PlaceViewModel()
        {
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        [JsonIgnore]
        public int ViewCount { get; set; }
    }