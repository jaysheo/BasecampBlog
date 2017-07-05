using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCC.Wall.Models.Entities;

namespace UCC.Wall.Models.Context
{
    public class WallEntities:DbContext
    {

        public WallEntities():base("WallEntities")
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Comment> Comments { get; set; }  

        public DbSet<Reply> Replies { get; set; }

        public DbSet<Notification> Notifications { get; set; }

    }
}
