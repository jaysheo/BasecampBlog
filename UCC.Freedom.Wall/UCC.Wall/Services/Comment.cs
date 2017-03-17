using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Services
{
    public class Comment
    {
        private readonly Models.Context.WallEntities context;

        public Comment()
        {
            context = new Models.Context.WallEntities();
        }

        public Models.Entities.Comment Create(Models.Entities.Comment entity)
        {
            context.Comments.Add(entity);
            context.SaveChanges();
            return entity;

        }

        public IEnumerable<Models.Entities.Comment> Retrieve()
        {
            return context.Comments.ToList();
        }

        public Models.Entities.Comment GetByID(long id)
        {
            return context.Comments.Where(x => x.ID.Equals(id)).FirstOrDefault();
        }

        public bool Update(Models.Entities.Comment entity)
        {
            var get = this.GetByID(entity.ID);
            get.Content = entity.Content;
            context.SaveChanges();
            return true;
        }

        public bool Delete(long id)
        {
            var get = this.GetByID(id);
            context.Comments.Remove(get);
            context.SaveChanges();
            return true;
        }

    }
}
