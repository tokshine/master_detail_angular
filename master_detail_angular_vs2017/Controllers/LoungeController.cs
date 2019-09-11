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
    public class LoungeController : Controller
    {
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return new JsonResult(GetTestData().First(i => i.ID == id), DefaultJsonSettings);
        }

        [HttpGet("GetLatestDiscussion")]
        public IActionResult GetLatestDiscussion()
        {
            return GetLatestDiscussion(DefaultNumberOfItems);
        }

        [HttpGet("GetLatestDiscussion/{n}")]
        public IActionResult GetLatestDiscussion(int n)
        {
            var data = GetTestData().OrderByDescending(i => i.CreatedDate).Take(n);
            return new JsonResult(data, DefaultJsonSettings);
        }

        private List<LoungeViewModel> GetTestData(int num = 99)
        {
            List<LoungeViewModel> list = new List<LoungeViewModel>();
            DateTime date = DateTime.Now.AddDays(-num);
            for (int id = 1; id <= num; id++)
            {
                list.Add(new LoungeViewModel()
                {
                    ID = id,
                    Subject = String.Format("Discussion {0} Subject", id),
                    Message = String.Format("This is a sample message  for Discussion {0}  Subject: It's more fun in the Philippines", id),
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
                return 10;
            }
        }

        private int MaxNumberOfItems
        {
            get
            {
                return 50;
            }
        }
    }
}


[JsonObject(MemberSerialization.OptOut)]
public class LoungeViewModel
{
    public int ID { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
    [JsonIgnore]
    public int ViewCount { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime LastModifiedDate { get; set; }
}