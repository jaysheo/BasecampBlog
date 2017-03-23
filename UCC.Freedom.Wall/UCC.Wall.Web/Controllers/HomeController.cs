using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UCC.Wall.Web.Controllers
{
  
    public class HomeController : Controller
    {
        private readonly Security.ISecurity security;

        public HomeController()
        {
            security = new Security.Config();
        }
        // GET: Home
       [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Initialize()
        {
            var result = security.SecurityValue();  
            return Json(result, JsonRequestBehavior.AllowGet);

        }
    }
}