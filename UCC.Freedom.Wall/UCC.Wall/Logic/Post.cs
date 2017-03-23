﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace UCC.Wall.Logic
{
    public class Post   : Component.Session.Config
    {
        private readonly Services.Post postService;
        private readonly Component.Cryptogphy.Crypt crypt;
        private readonly Comment commentLogic;
        private readonly Models.Context.WallEntities context;
        private readonly Extension.MapToDTO mapDTO;
        private readonly UpdatePost updatePostLogic;
        public Post()
        {
            postService = new Services.Post();
            crypt = new Component.Cryptogphy.Crypt();
            commentLogic = new Comment();
            context = new Models.Context.WallEntities();
            mapDTO = new Extension.MapToDTO();
            updatePostLogic = new Logic.UpdatePost();
        }

        public DTO.Post Create(Models.Entities.Post post)
        {
            using (TransactionScope scope = new TransactionScope())
            {
                post.UserID = long.Parse(crypt.Decrypt(UserValues().ID));
                post.UserName = UserValues().UserName;
                post.DateCreated = DateTime.UtcNow;
                post.LastUpdatedDate = DateTime.UtcNow;

                DTO.Post postDTO =  updatePostLogic.Upsert(post); 
              //  DTO.Post postDTO = mapDTO.Posts(postService.Create(post));
                scope.Complete();
                return postDTO;

            }

            

        }

        //public List<DTO.Post> RetrievePerID()
        //{
          
        //    List<DTO.Post> listPostDTO = new List<DTO.Post>();
        //    var get = postService.Retrieve();
        //    var descGet = get.OrderByDescending(x => x.ID).ToList();
        //    foreach (var post in descGet)
        //    {
        //        var comments = commentLogic.RetrievePerID(post.ID);
               
        //        DTO.Post postDTO = new DTO.Post {
        //            ID = crypt.Encrypt(post.ID.ToString()),
        //            Content = post.Content,
        //            UserID = crypt.Encrypt(post.UserID.ToString()),
        //            DateCreated = post.DateCreated,
        //            UserName = post.UserName,
        //            Comments = comments
        //        };

        //        listPostDTO.Add(postDTO);
        //    }

        //    return listPostDTO;

        //}

        public List<DTO.Post> Retrieve(int skip,int take) {

            var get = postService.Retrieve(skip,take);
            List<DTO.Post>listPostDTO =  new List<DTO.Post>();
            foreach (var post in get)
            {
                post.DateCreated = post.DateCreated.ToLocalTime();
                listPostDTO.Add(mapDTO.Posts(post));

            }
            return listPostDTO;
          

        }

        public bool Update(Models.Entities.Post post)
        {
            return postService.Update(post);
        }

        public bool Delete(string id)
        {
            return postService.Delete(Convert.ToInt64(crypt.Decrypt(id)));
        }

        public List<DTO.Post> Search(string term)
        {
            var search = context.Posts.Where(x => x.UserName.Contains(term) || x.Content.Contains(term)).ToList();

            var descSearch = search.OrderByDescending(x => x.ID).ToList();

            List<DTO.Post> listPostDTO = new List<DTO.Post>();
            foreach (var post in descSearch)
            {
                var comments = commentLogic.RetrievePerID(post.ID);
                DTO.Post postDTO = new DTO.Post
                {
                    ID = crypt.Encrypt(post.ID.ToString()),
                    Content = post.Content,
                    DateCreated = post.DateCreated,
                    UserName = post.UserName,
                    Comments = comments

                };

                listPostDTO.Add(postDTO);

            }

            return listPostDTO;

        }

        public bool UpdatePost(string id)
        {          
            return postService.Update(postService.GetByID(long.Parse(crypt.Decrypt(id))));

        }

    }
}
