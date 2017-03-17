using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Services
{
    public class Reply
    {
        private readonly Models.Context.WallEntities context;

        public Reply()
        {
            context = new Models.Context.WallEntities();
        }

        public Models.Entities.Reply Create(Models.Entities.Reply entity)
        {
            context.Replies.Add(entity);
            context.SaveChanges();
            return entity;

        }

        public IEnumerable<Models.Entities.Reply> Retrieve()
        {
            return context.Replies.ToList();
        }

        public Models.Entities.Reply GetByID(long id)
        {
            return context.Replies.Where(x => x.ID.Equals(id)).FirstOrDefault();
        }

        public bool Update(Models.Entities.Reply entity)
        {
            var get = this.GetByID(entity.ID);
            get.Content = entity.Content;
            context.SaveChanges();
            return true;
        }

        public bool Delete(long id)
        {
            var get = this.GetByID(id);
            context.Replies.Remove(get);
            context.SaveChanges();
            return true;
        }
    }
}
