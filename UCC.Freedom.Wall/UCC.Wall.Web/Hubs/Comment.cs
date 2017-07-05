using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace UCC.Wall.Web.Hubs
{
    public class Comment : Hub
    {
        private readonly Logic.Comment commentLogic;
        private readonly Component.Cryptogphy.Crypt crypt;
       
        public Comment()
        {
            commentLogic = new Logic.Comment();
            crypt = new Component.Cryptogphy.Crypt();
            
        }

        public void send(DTO.Comment comment, string postUserID)
        {

            //var request = Context.Request.Cookies[crypt.Encrypt("UserID")].Value;
            //comment.UserName = request;
            //DTO.Comment get = commentLogic.Create(comment);

            //string sd = string.Format("{0:F}", comment.DateCreated);
            // comment.DateCreated = DateTime.Parse(sd);   
            Clients.All.broadcastComment(comment,postUserID);
        }

      
    }
}