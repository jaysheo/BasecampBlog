using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Logic
{
    public class Notification  :Component.Session.Config
    {

        private readonly Services.Notification notificationService;
        private readonly Extension.MapToDTO mapDTO;
        private readonly Models.Context.WallEntities context;
        private readonly Component.Cryptogphy.Crypt crypt;
        public Notification()
        {
            notificationService = new Services.Notification();
            mapDTO = new Extension.MapToDTO();
            context = new Models.Context.WallEntities();
            crypt = new Component.Cryptogphy.Crypt();
        }

        public DTO.Notification Create(Models.Entities.Notification notif)
        {

            notif.DateCreated = DateTime.UtcNow;
            notif.LastUpdatedDate = DateTime.UtcNow;
            Models.Entities.Notification get = notificationService.Create(notif);  
            return mapDTO.Notification(get);    
        }   

        public List<DTO.Notification> Retrieve(int skip, int take)
        {

            long userID = long.Parse(crypt.Decrypt(UserValues().ID));

            List<Models.Entities.Post> getPost = this.GetPostOfUser(userID);
            List<long> getPostID = getPost.Select(x => x.ID).ToList();
            
            List<Models.Entities.Notification> getNotif = context.Notifications.Where(x => getPostID.Contains(x.PostID) && x.UserID != userID).ToList();

            var getUnseenCount = getNotif.Where(x => x.isSeen.Equals(false)).Count();

           
            List<long> getUserID = getNotif.Select(x => x.UserID).ToList();
            var getUsername = context.Users.Where(x => getUserID.Contains(x.ID)).ToList();

            List<DTO.Notification> listDTONotification = new List<DTO.Notification>();
            if (getNotif != null)
            {           
                foreach(var x in getNotif)
                {
                   
                    DTO.Notification notifDTO = mapDTO.Notification(x);
                    notifDTO.DateCreated = notifDTO.DateCreated.ToLocalTime();
                    notifDTO.UserName = getUsername.Where(v => v.ID.Equals(x.UserID)).Select(s => s.FirstName + " " + s.LastName).FirstOrDefault();
                    notifDTO.UnseenCount = getUnseenCount;
                    listDTONotification.Add(notifDTO);      
                }


            }
            ////commenting
            //List<long> commentedUserID = context.Comments.Where(x => getPostID.Contains(x.PostID)).Select(v => v.UserID).ToList();

            //var getNo = context.Notifications.Where(x => commentedUserID.Contains(x.PostID)).ToList();
            //foreach (var x  in getNo)
            //{
            //    x.Action = "also commented on";
            //}


            return listDTONotification.OrderByDescending(x => x.LastUpdatedDate).ToList();  
        }

        public List<Models.Entities.Post> GetPostOfUser(long userID)
        {
            return context.Posts.Where(x => x.UserID.Equals(userID)).ToList();
        }

        public bool SeenNotif()
        {
            long userID = long.Parse(crypt.Decrypt(UserValues().ID));
            var getPostID = this.GetPostOfUser(userID).Select(x => x.ID);
            context.Notifications.Where(x => getPostID.Contains(x.PostID) && x.DateCreated <= DateTime.UtcNow && x.isSeen.Equals(false)).ToList().ForEach(d => d.isSeen = true);
            context.SaveChanges();
            return true;

        }

    



    }

   
}
