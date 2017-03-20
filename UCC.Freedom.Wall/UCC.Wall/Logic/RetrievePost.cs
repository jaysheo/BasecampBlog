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
       
        public RetrievePost()
        {
            postLogic = new Post();
            commentLogic = new Comment();
            replyLogic = new Reply();
            crypt = new Component.Cryptogphy.Crypt();
         

        }

        public DTO.RetrievePost Get(int skip,int take)
        {
            List<DTO.Post> arrangePost = postLogic.Retrieve(skip, take);

            return new DTO.RetrievePost
            {
                Posts = arrangePost,
                Comments = commentLogic.Retrieve(),
                Replies = replyLogic.Retrieve()
            };
            
        }

        


        
    }
}
