using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace UCC.Wall.Extension
{
    public class MapToDTO
    {

        private readonly Component.Cryptogphy.Crypt crypt;
        public MapToDTO()
        {
            crypt = new Component.Cryptogphy.Crypt();
        }
             

        public DTO.User Users(Models.Entities.User user)
        {

            return new DTO.User
            {
                ID = crypt.Encrypt(user.ID.ToString()),
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.LastName

            };

        }


        public DTO.Post Posts(Models.Entities.Post post)
        {
                   
            return new DTO.Post
            {
                ID = crypt.Encrypt(post.ID.ToString()),
                Content = post.Content,
                DateCreated = post.DateCreated,
                UserID = crypt.Encrypt(post.UserID.ToString()),
                Comments = new List<DTO.Comment>(),
                LastUpdatedDate = post.LastUpdatedDate,
                UserName = post.UserName

            };
        }

        public DTO.Notification Notification(Models.Entities.Notification notif)
        {
            return new DTO.Notification
            {
                ID = crypt.Encrypt(notif.ID.ToString()),
                Action = notif.Action,
                DateCreated = notif.DateCreated,
                isSeen = notif.isSeen,
                LastUpdatedDate = notif.LastUpdatedDate,
                PostID = crypt.Encrypt(notif.PostID.ToString()),   
                UserID = crypt.Encrypt(notif.UserID.ToString())
               

            };

        }

        public DTO.Comment Comments(Models.Entities.Comment comment)
        {     
            return new DTO.Comment
            {
                ID = crypt.Encrypt(comment.ID.ToString()),
                Content = comment.Content,
                DateCreated = comment.DateCreated,
                UserName = comment.UserName,
                UserID = crypt.Encrypt(comment.UserID.ToString()),
                PostID = crypt.Encrypt(comment.PostID.ToString()),
                Replies = new List<DTO.Reply>()
            };

        }

        public DTO.Reply Replies(Models.Entities.Reply reply)
        {
            return new DTO.Reply
            {
                ID = crypt.Encrypt(reply.ID.ToString()),
                Content = reply.Content,
                DateCreated = reply.DateCreated,
                UserName = reply.UserName,
                CommentID = crypt.Encrypt(reply.CommentID.ToString())
                
            };

        }
    }
}
