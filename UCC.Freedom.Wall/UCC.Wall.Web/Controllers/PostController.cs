﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using entity = UCC.Wall.Models.Entities;

namespace UCC.Wall.Web.Controllers
{
    public class PostController : Controller
    {
        private readonly Logic.Post postLogic;
        private readonly Logic.RetrievePost retrievePost;
        public PostController()
        {
            postLogic = new Logic.Post();
            retrievePost = new Logic.RetrievePost();
        }

        [HttpPost]
        public ActionResult Create(entity.Post post)
        {
            var get = postLogic.Create(post);
            return Json(get, JsonRequestBehavior.AllowGet);
        }

        // GET: Post
        [HttpGet]
        public ActionResult Retrieve()
        {
            var get = postLogic.RetrievePerID();
            return Json(get, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult Delete(string id)
        {
            var get = postLogic.Delete(id);
            return Json(get, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Search(string term)
        {
            var get = postLogic.Search(term);
            return Json(get, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Get()
        {
            var get = retrievePost.Get();
            return Json(get, JsonRequestBehavior.AllowGet);
        }
    }
}