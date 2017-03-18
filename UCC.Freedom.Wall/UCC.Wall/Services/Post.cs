using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Services
{
   public  class Post
    {
        private readonly Models.Context.WallEntities context;

        public Post()
        {
            context = new Models.Context.WallEntities();
        }

        public Models.Entities.Post Create(Models.Entities.Post entity)
        {
            context.Posts.Add(entity);
            context.SaveChanges();
            return entity;

        }

        public IEnumerable<Models.Entities.Post> Retrieve()
        {
            return context.Posts.ToList();
        }

        public Models.Entities.Post GetByID(long id)
        {
            return context.Posts.Where(x => x.ID.Equals(id)).FirstOrDefault();
        }

        public bool Update(Models.Entities.Post entity)
        {
            var get = this.GetByID(entity.ID);
            get.Content = entity.Content;
            context.SaveChanges();  
            return true;
        }

        public bool Delete(long id)
        {
            var get = this.GetByID(id);
            context.Posts.Remove(get);
            context.SaveChanges();
            return true;
        }
    }
}
