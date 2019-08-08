using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstWebCore.Models
{
    public class AskUser
    {
        public int id { get; set; }
        public string IdentityId { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string photoPath { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Follower> Followers { get; set; }

        public AskUser()
        {
            Posts = new List<Post>();
            Followers = new List<Follower>();
        }
    }
}
