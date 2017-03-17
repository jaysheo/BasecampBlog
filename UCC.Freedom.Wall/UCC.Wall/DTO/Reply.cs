using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.DTO
{
    public class Reply
    {
        public Reply()
        {

        }

        internal Reply(Models.Entities.Reply reply)
        {
            ID = reply.ID.ToString();
            Content = reply.Content;
            DateCreated = reply.DateCreated;
            UserName = reply.UserName;
            CommentID = reply.CommentID.ToString();



        }

        public string ID { get; set; }

        public string Content { get; set; }

        public DateTime DateCreated { get; set; }

        public string UserName { get; set; }

        public string CommentID { get; set; }

      
    }
}
