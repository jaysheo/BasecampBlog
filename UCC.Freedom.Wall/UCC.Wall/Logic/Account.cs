using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace UCC.Wall.Logic
{
    public class Account  : Component.Session.Config
    {
        private readonly Services.User userService;
        private readonly DTO.User userDTO;
        private readonly Models.Context.WallEntities context;
        private readonly Component.Cryptogphy.Crypt crypt;
        private readonly Extension.MapToDTO mapDTO;

        public Account()
        {
            userService = new Services.User();
            userDTO = new DTO.User();
            context = new Models.Context.WallEntities(); 
            mapDTO = new Extension.MapToDTO();

        }

        public DTO.User Login(Models.Entities.User user)
        {
           var get = context.Users.SingleOrDefault(x => x.Email.Equals(user.Email) && x.Password.Equals(user.Password));

            if (get != null)
            {   
                var map = mapDTO.Users(get);
                ConfigSession(map);         
                return map;  
            }

            return null;

        }

        public bool SignUp(Models.Entities.User user)
        {
            var checkEmail = context.Users.SingleOrDefault(x => x.Email.Equals(user.Email));
            if (checkEmail == null)
            {
                userService.Create(user);
                return true;

            }

        
            return false;

        }

        public Component.Session.SessionEntity CheckLoggedIn() {

            
            if (UserValues() != null)
            {
                return UserValues();
            }

            return new Component.Session.SessionEntity
            {
                ID = null,
                UserName = null
            };
              

        }

        public bool Logout()
        {
            return AbandonSession();

        }

        

    }
}
