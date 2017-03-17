using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.Services
{
    public class User
    {
        private readonly Models.Context.WallEntities context;

        public User()
        {
            context = new Models.Context.WallEntities();
        }

        public bool Create(Models.Entities.User entity)
        {
            context.Users.Add(entity);
            context.SaveChanges();
            return true;

        }

        public IEnumerable<Models.Entities.User> Retrieve()
        {
            return context.Users.ToList();   
        }

        public Models.Entities.User GetByID(long id)
        {
            return context.Users.Where(x => x.ID.Equals(id)).FirstOrDefault();  
        }

        public bool Update(Models.Entities.User entity)
        {
            var get = this.GetByID(entity.ID);
            get.FirstName = entity.FirstName;
            get.LastName = entity.LastName;
            context.SaveChanges();

            return true;
        }

        public bool Delete(long id)
        {
            var get = this.GetByID(id);
            context.Users.Remove(get);
            context.SaveChanges();
            return true;
        }


    }
}
