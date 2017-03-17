using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace UCC.Wall.Component.Session
{
    public class Config
    {
        private readonly Component.Cryptogphy.Crypt crypt;
        public Config()
        {
            crypt = new Cryptogphy.Crypt();
                
        }

        public void ConfigSession(DTO.User user)
        {       
            var session = HttpContext.Current.Session;
            session[this.SessionString().ID] = user.ID;
            session[this.SessionString().UserName] = user.FirstName + " " + user.LastName;
             
        }

        public SessionEntity UserValues()
        {
            SessionEntity userSession = new SessionEntity();
            var session = HttpContext.Current.Session;
            if (session[this.SessionString().ID] != null)
            {
                userSession.ID = session[this.SessionString().ID].ToString();
                userSession.UserName = session[this.SessionString().UserName].ToString();
                return userSession;

            }

            return null;
           
        }

        public bool AbandonSession()
        {
            HttpContext.Current.Session.Abandon();
            return true;
        }


        public SessionEntity SessionString()
        {
            SessionEntity userSessesion= new SessionEntity();
            var session = HttpContext.Current.Session;
            userSessesion.ID = crypt.Encrypt("UserID");
            userSessesion.UserName = crypt.Encrypt("UserName");



            return userSessesion;


        }


    }
}
