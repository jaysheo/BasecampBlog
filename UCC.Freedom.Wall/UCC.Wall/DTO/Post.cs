using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCC.Wall.Models.Entities;

namespace UCC.Wall.DTO
{
    public class Post
    {
        public Post()
        {

        }

        internal Post(Models.Entities.Post post)
        {
            ID = post.ID.ToString();
            Content = post.Content;
            DateCreated = post.DateCreated;
            UserName = post.UserName;
            UserID = post.UserID.ToString();
            LastUpdatedDate = post.LastUpdatedDate;
            this.Comments = new List<Comment>();     
        }


        public string ID { get; set; }

        public string Content { get; set; }

        public DateTime DateCreated { get; set; }

        public string UserName { get; set; }

        public string UserID{ get; set; }

        public DateTime? LastUpdatedDate { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
