using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstWebCore.DTOModels
{
    public class PostDto
    {
        public int id { get; set; }
        public string question { get; set; }
        public string answer { get; set; }
        public int recvUserId { get; set; }
        public int sendUserId { get; set; }
        public DateTime? date { get; set; }
        public bool? anonymous { get; set; }
        public bool? answered { get; set; }
        public bool? qSeen { get; set; }
        public bool? ansSeen { get; set; }

        public ICollection<LikeDto> Likes { get; set; }
        public PostDto()
        {
            Likes = new List<LikeDto>();
        }
    }
}
