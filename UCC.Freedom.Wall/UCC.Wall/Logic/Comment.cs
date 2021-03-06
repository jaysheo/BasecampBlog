﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Logic
{
    public class Comment  :Component.Session.Config
    {
        public readonly Services.Comment commentService;
        private readonly Component.Cryptogphy.Crypt crypt;
        private readonly Models.Context.WallEntities context;
        private readonly Reply replyLogic;
        private readonly Extension.MapToDTO mapDTO;
      //  private readonly Post postLogic;
        public Comment()
        {
            commentService = new Services.Comment();
            crypt = new Component.Cryptogphy.Crypt();
            context = new Models.Context.WallEntities();
            replyLogic = new Reply();
            mapDTO = new Extension.MapToDTO();
            //postLogic = new Post();
        }

        public DTO.Comment Create(DTO.Comment comment)
        {       
            comment.DateCreated = DateTime.UtcNow;
          //  postLogic.UpdatePost(comment.PostID);   

            Models.Entities.Comment commentEntity = new Models.Entities.Comment
            {
                Content = comment.Content,
                DateCreated = DateTime.UtcNow,
                PostID = long.Parse(crypt.Decrypt(comment.PostID)),
                UserName = UserValues().UserName
            };

           return mapDTO.Comments(commentService.Create(commentEntity));
              
        }

        public List<DTO.Comment> RetrievePerID(long id)
        {
            List<DTO.Comment> listCommentDTO = new List<DTO.Comment>();

            var get = context.Comments.Where(x => x.PostID.Equals(id)).ToList();

            DateTime localDate = DateTime.Now;
            foreach (var comment in get)
            {
                var reply = replyLogic.RetrievePerID(comment.ID);

                DTO.Comment commentDTO = mapDTO.Comments(comment);
                commentDTO.Replies = reply;
                listCommentDTO.Add(commentDTO); 
            }

            return listCommentDTO;
            
        }

        public List<DTO.Comment> Retrieve()
        {
            List<DTO.Comment> listDTOComment = new List<DTO.Comment>();
            var get = commentService.Retrieve();
            foreach (var comment in get)
            {
                listDTOComment.Add(mapDTO.Comments(comment)); 
            }
            return listDTOComment;
        }

        public bool Delete(string id)
        {
            return commentService.Delete(long.Parse(crypt.Decrypt(id)));

        }

    }
}
