using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCC.Wall.Models.Entities;

namespace UCC.Wall.DTO
{
    public class Comment
    {
        public Comment()
        {

        }

        internal Comment(Models.Entities.Comment comment)
        {
            ID = comment.ID.ToString();
            Content = comment.Content;
            DateCreated = DateCreated;
            UserName = comment.UserName;
            PostID = comment.PostID.ToString();
            this.Replies = new List<Reply>();
            
        }

        public string ID { get; set; }

        public string Content { get; set; }

        public DateTime DateCreated { get; set; }

        public string UserName { get; set; } 

        public List<Reply> Replies { get; set; }

        public string PostID { get; set; }

      





    }
}
