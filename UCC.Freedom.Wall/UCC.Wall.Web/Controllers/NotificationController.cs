using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UCC.Wall.Web.Controllers
{
    //[Authorization]
    public class NotificationController : Controller
    {
        private readonly UCC.Wall.Logic.Notification notificationLogic;
        public NotificationController()
        {
            notificationLogic = new Logic.Notification();
        }

        // GET: Notification
        [Authorization]
        [HttpGet]
        public ActionResult Retrieve(int skip, int take)
        {
            var get = notificationLogic.Retrieve(skip,take);
            return Json(get, JsonRequestBehavior.AllowGet);
           
        }

        [Authorization]
        [HttpGet]
        public ActionResult Seen()
        {
            var get = notificationLogic.SeenNotif();
            return Json(get, JsonRequestBehavior.AllowGet);

        }
    }
}