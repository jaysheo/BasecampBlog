using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Logic
{
    public class RetrievePost
    {
        private readonly Post postLogic;
        private readonly Comment commentLogic;
        private readonly Reply replyLogic;
        private readonly Component.Cryptogphy.Crypt crypt;
        private readonly Models.Context.WallEntities context;
        private readonly Extension.MapToDTO mapDTO;
       
        public RetrievePost()
        {
            postLogic = new Post();
            commentLogic = new Comment();
            replyLogic = new Reply();
            crypt = new Component.Cryptogphy.Crypt();
            context = new Models.Context.WallEntities();
            mapDTO = new Extension.MapToDTO();
         

        }

        public DTO.RetrievePost Get(int skip,int take)
        {
            List<DTO.Post> arrangePost = postLogic.Retrieve(skip, take);
            List<DTO.Comment> commentPerID = new List<DTO.Comment>();
            

            List<long> getID = arrangePost.Select(x => long.Parse(crypt.Decrypt(x.ID))).ToList();

            List<Models.Entities.Comment> getCommentsPerID = context.Comments.Where(x => getID.Contains(x.PostID)).ToList();

            foreach (Models.Entities.Comment comment in getCommentsPerID)
            {

                comment.DateCreated = comment.DateCreated.ToLocalTime();
                commentPerID.Add(mapDTO.Comments(comment));      
            }


            return new DTO.RetrievePost
            {
                Posts = arrangePost,
                Comments =commentPerID
               // Replies = replyLogic.Retrieve()
            };
            
        }

        //public DateTime  ConvertTimeToLocal(DateTime time)
        //{
        //    DateTime localTime = DateTime.Parse(time);
        //    var kind = localTime.Kind;
        //    return localTime.ToLocalTime();    
        //}

        


        
    }
}
