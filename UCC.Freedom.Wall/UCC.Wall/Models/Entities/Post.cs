using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Models.Entities
{
    public class Post
    {
        public long ID { get; set; }

        public string Content { get; set; }

        public DateTime DateCreated { get; set; }

        public string UserName { get; set; }

        [ForeignKey("User")]
        public long UserID { get; set; }
        public User User { get; set; }

        public DateTime? LastUpdatedDate { get; set; }
                
        public virtual List<Comment> Comments { get; set; }

    }
}
