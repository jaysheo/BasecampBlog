using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCC.Wall.DTO
{
    public class RetrievePost
    {
        
        public List<Post> Posts { get; set; }

        public List<Comment> Comments { get; set; }

        public List<Reply> Replies { get; set; }


    }
}
