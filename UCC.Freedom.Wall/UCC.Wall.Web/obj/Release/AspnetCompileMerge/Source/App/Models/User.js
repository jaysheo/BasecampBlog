"use strict";
var UserModel = (function () {
    function UserModel(FirstName, LastName, Email, ID) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.ID = ID;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
/*

        public long ID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public virtual List<Post> Posts { get; set; }
*/ 
//# sourceMappingURL=User.js.map