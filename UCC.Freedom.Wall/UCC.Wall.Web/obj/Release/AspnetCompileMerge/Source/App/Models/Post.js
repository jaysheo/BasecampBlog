"use strict";
var PostModel = (function () {
    function PostModel(Content, DateCreated, UserName, Password) {
        this.Content = Content;
        this.DateCreated = DateCreated;
        this.UserName = UserName;
        this.Password = Password;
    }
    return PostModel;
}());
exports.PostModel = PostModel;
/*
 public long ID { get; set; }

        public string Content { get; set; }

        public DateTime DateCreated { get; set; }

        public string UserName { get; set; }

        [ForeignKey("User")]
        public long UserID { get; set; }
        public User User { get; set; }

        public virtual List<Comment> Comments { get; set; }

*/ 
//# sourceMappingURL=Post.js.map