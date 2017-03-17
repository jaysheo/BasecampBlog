export class PostModel {
    constructor(
        public Content: string,
        public DateCreated: string,
        public UserName: string,
        public Password: string
    ) { }



}








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