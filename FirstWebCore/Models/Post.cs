using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FirstWebCore.Models
{
    public class Post
    {
        public int id { get; set; }
        public string question { get; set; }
        public string answer { get; set; }
        public int recvUserId { get; set; }
        [ForeignKey("recvUserId")]
        public virtual AskUser recvUser { get; set; }
        public int sendUserId { get; set; }
        public DateTime? date { get; set; }
        public bool? anonymous { get; set; }
        public bool? answered { get; set; }
        public ICollection<Like> Likes { get; set; }
        public bool? qSeen { get; set; }
        public bool? ansSeen { get; set; }
        public Post()
        {
            Likes = new List<Like>();
        }

    }
}
