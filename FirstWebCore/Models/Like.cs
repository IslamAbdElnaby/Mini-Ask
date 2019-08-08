using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstWebCore.Models
{
    public class Like
    {
        public int id { get; set; }
        public Post post { get; set; }
        public int postId { get; set; }
        public int reactUserId { get; set; }
        public bool? seen { get; set; }
    }
}
