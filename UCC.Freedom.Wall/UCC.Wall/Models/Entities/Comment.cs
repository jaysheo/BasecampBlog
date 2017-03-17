using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Models.Entities
{
    public class Comment
    {
        public long ID { get; set; }

        public string Content { get; set; }

        public DateTime DateCreated { get; set; }

        public string UserName { get; set; }

        [ForeignKey("Post")]
        public long PostID { get; set; }
        public Post Post { get; set; }

        public virtual List<Reply> Replies { get; set; }
    }
}
