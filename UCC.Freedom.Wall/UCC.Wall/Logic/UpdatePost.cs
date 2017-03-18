using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Logic
{
    public class UpdatePost
    {
        private readonly Services.Post postService;
        private readonly Models.Context.WallEntities context;
        private readonly Extension.MapToDTO mapDTO;

        public UpdatePost()
        {
            mapDTO = new Extension.MapToDTO();
            postService = new Services.Post();
            context = new Models.Context.WallEntities();
        }


        public DTO.Post Upsert(Models.Entities.Post post)
        {
           
            Models.Entities.Post get = context.Posts.Where(x => x.ID.Equals(post.ID)).FirstOrDefault();

            if (get != null)
            {
                get.LastUpdatedDate = DateTime.UtcNow;
                context.SaveChanges();
                return mapDTO.Posts(get);
            }

            else
            { 
                return mapDTO.Posts(postService.Create(post)); 
            }



         
           
        }

    }
}
