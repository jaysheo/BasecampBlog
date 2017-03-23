using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UCC.Wall.Web.Security
{
    public class Config  : ISecurity
    {


        private readonly Component.Cryptogphy.Crypt crypt;

        public Config()
        {
            crypt = new Component.Cryptogphy.Crypt();
            this.ConfigureValue();
        }


        public void ConfigureValue()
        {
            var session = HttpContext.Current.Session;
            session[EntityKeyString().Key] = crypt.Encrypt("whfdfhdsfue3fweuofbweur485412512b8rewrewrewrewrwer");

            session[EntityKeyString().Value] = crypt.Encrypt("w4re4rew7r7ew1fr7er7frsdsderer1815we7rew1rwe4");
        }

        public Entity SecurityValue()
        {
            
            var session = HttpContext.Current.Session;
            return new Entity
            {
                Key = session[this.EntityKeyString().Key].ToString(),
                Value = session[this.EntityKeyString().Value].ToString()
            };
        }

        public Entity EntityKeyString()
        {
            return new Entity
            {
                Key = crypt.Encrypt("KeyTicket"),
                Value = crypt.Encrypt("KeyValue")
            };

        }
        

    }
}