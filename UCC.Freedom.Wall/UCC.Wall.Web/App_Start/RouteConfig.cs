using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace UCC.Wall.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               name: "post",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
           );

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller="Home",action = "Index", id = UrlParameter.Optional }
            //);

            //// Route override to work with Angularjs and HTML5 routing
            //context.MapRoute(
            //    name: "Application1Override",
            //    url: "Application1/{*.}",
            //    defaults: new { controller = "Application1", action = "Index" }
            //);

        }
    }
}

