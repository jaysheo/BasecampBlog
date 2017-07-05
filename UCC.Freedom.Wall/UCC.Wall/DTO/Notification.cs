using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.DTO
{
    public class Notification
    {


        public Notification()
        {

        }

        internal Notification(Models.Entities.Notification notif)
        {
            ID = notif.ID.ToString();
            PostID = notif.PostID.ToString();
            Action = notif.Action;
            UserID = notif.UserID.ToString();
            isSeen = notif.isSeen;
            DateCreated = notif.DateCreated;
            LastUpdatedDate = notif.LastUpdatedDate;
            

        }

    
        public string ID { get; set; }

        public string PostID { get; set; }

        public string Action { get; set; }

        public string UserID { get; set; }

        public bool isSeen { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime LastUpdatedDate { get; set; }

        public string UserName { get; set; }

        public int UnseenCount { get; set; }



    }
}
