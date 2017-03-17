using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCC.Wall.Models.Entities;

namespace UCC.Wall.DTO
{
    public class User
    {

        public User()
        {

        }

        internal User(Models.Entities.User user)
        {
            ID = user.ID.ToString();
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email; 
        }

        public string ID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }   
        
    }
}
