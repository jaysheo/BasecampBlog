using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace UCC.Wall.Logic
{
    public class Reply: Component.Session.Config
    {
        private readonly Services.Reply replyService;
        private readonly Models.Context.WallEntities context;
        private readonly DTO.Reply replyDTO;
        private readonly Component.Cryptogphy.Crypt crypt;
        private readonly Extension.MapToDTO mapDTO;
        private readonly UpdatePost updatePostLogic;

        public Reply()
        {          
            replyService = new Services.Reply();
            context = new Models.Context.WallEntities();
            replyDTO = new DTO.Reply();
            crypt = new Component.Cryptogphy.Crypt();
            mapDTO = new Extension.MapToDTO();
            updatePostLogic = new UpdatePost();
            
        }

        public DTO.Reply Create(Models.Entities.Reply reply)
        {
            using (TransactionScope scope = new TransactionScope())
            {       
                var get = context.Comments.Where(x => x.ID.Equals(reply.CommentID)).Select(x => x.PostID).FirstOrDefault();

                Models.Entities.Post post = new Models.Entities.Post();
                post.ID = get;

                updatePostLogic.Upsert(post);

                reply.UserName = UserValues().UserName;
                reply.DateCreated = DateTime.UtcNow;

                DTO.Reply replyDTO = mapDTO.Replies(replyService.Create(reply));
                scope.Complete();
                return replyDTO; 

            }


        }

        public List<DTO.Reply> RetrievePerID(long id)
        {
            List<DTO.Reply> listReplyDTO = new List<DTO.Reply>();
            var get = context.Replies.Where(x => x.CommentID.Equals(id)).ToList();
            foreach(var reply in get)
            {
                DTO.Reply replyDTO = new DTO.Reply
                {
                    ID = crypt.Encrypt(reply.ID.ToString()),
                    Content = reply.Content,
                    DateCreated = reply.DateCreated,
                    UserName = reply.UserName,

                };

                listReplyDTO.Add(replyDTO);
                                         
            }       
            return listReplyDTO;
            
        }

        public List<DTO.Reply> Retrieve()
        {
            List<DTO.Reply> listDTOReply = new List<DTO.Reply>();
            var get = replyService.Retrieve();
            foreach (var reply in get)
            {
                listDTOReply.Add(mapDTO.Replies(reply));
            }

            return listDTOReply;
        }

        public bool Update(Models.Entities.Reply reply)
        {
            return replyService.Update(reply);
        }

        public bool Delete(long id)
        {
            return replyService.Delete(id);
        }







    }
}
