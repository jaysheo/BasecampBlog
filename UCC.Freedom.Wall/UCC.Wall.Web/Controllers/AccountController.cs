using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using logic = UCC.Wall.Logic;
using entities = UCC.Wall.Models.Entities;

namespace UCC.Wall.Web.Controllers
{
    public class AccountController : Controller
    {

        private readonly logic.Account accountLogic;

        public AccountController()
        {
            accountLogic = new Logic.Account();
        }
        // GET: Account
        [HttpPost]
        public ActionResult Login(entities.User user)
        {
            var get = accountLogic.Login(user);
            return Json(get, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SignUp(entities.User user)
        {
            var get = accountLogic.SignUp(user);
            return Json(get, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult CheckLoggedIn()
        {
            var get = accountLogic.CheckLoggedIn();
            return Json(get, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Logout()
        {
            var get = accountLogic.Logout();
            return Json(get, JsonRequestBehavior.AllowGet);
        }


    }
}