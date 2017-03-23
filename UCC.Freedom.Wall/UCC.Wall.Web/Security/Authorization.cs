using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace System.Web.Mvc
{
    public class Authorization : AuthorizeAttribute
    {
        public string getTicket;

        public Authorization()
        {
            this.getTicket = "c6e3a0ff-c1aa-4e52-bcfa-334f741d223e";
        }                                                            
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            var ticket = HttpContext.Current.Request.Headers["75e27c69-1186-4316-b322-9303265c9597"];
          
            if (ticket == null)
            {
                return false;
            }

            if (this.getTicket.Contains(ticket))
            {
                return true;

            } else return false;                               
         }


    }
}