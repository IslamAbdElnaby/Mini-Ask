using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstWebCore.Models
{
    public class Follower
    {
        public int id { get; set; }
        public virtual AskUser user { get; set; }
        public int userId { get; set; }
        public int followerId { get; set; }
    }
}
