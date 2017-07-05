using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using logic = UCC.Wall.Logic;
using entity = UCC.Wall.Models.Entities;
using dto = UCC.Wall.DTO;

namespace UCC.Wall.Web.Controllers
{
    public class CommentController : Controller
    {
        private readonly logic.Comment commentLogic;
        public CommentController()
        {
            commentLogic = new logic.Comment();
        }

        // GET: Comment
          [HttpPost]
        public ActionResult Create(dto.Comment comment)
        {
            var get = commentLogic.Create(comment);
            return Json(get, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Delete(string id)
        {
            var get = commentLogic.Delete(id);
            return Json(get, JsonRequestBehavior.AllowGet);
        }



    }
}