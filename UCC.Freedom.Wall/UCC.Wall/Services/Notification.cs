using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Services
{
    public class Notification
    {

        private readonly Models.Context.WallEntities context;

        public Notification()
        {
            context = new Models.Context.WallEntities();
        }

        public Models.Entities.Notification Create(Models.Entities.Notification entity)
        {
            context.Notifications.Add(entity);
            context.SaveChanges();
            return entity;

        }

        public IEnumerable<Models.Entities.Notification> Retrieve(int skip, int take)
        {
            return context.Notifications.ToList().OrderByDescending(x => x.LastUpdatedDate).Skip(skip).Take(take);
        }

        public Models.Entities.Notification GetByID(long id)
        {
            return context.Notifications.Where(x => x.ID.Equals(id)).FirstOrDefault();
        }

        public bool Update(Models.Entities.Notification entity)
        {
            var get = this.GetByID(entity.ID);
            get.Action = entity.Action;
            context.SaveChanges();
            return true;
        }

        public bool Delete(long id)
        {
            var get = this.GetByID(id);
            context.Notifications.Remove(get);
            context.SaveChanges();
            return true;
        }
    }
}
