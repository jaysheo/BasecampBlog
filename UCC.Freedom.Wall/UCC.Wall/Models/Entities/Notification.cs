using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Models.Entities
{
    public class Notification
    {

        public long ID { get; set; }

        [ForeignKey("Post")]
        public long PostID { get; set; } 
        public Post Post { get; set; } 

        public string Action { get; set; }

        public long UserID { get; set; }

        public bool isSeen { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime LastUpdatedDate { get; set; }


    }
}
