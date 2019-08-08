using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstWebCore.DTOModels
{
    public class LikeDto
    {
        public int id { get; set; }
        public int postId { get; set; }
        public int reactUserId { get; set; }
        public string answer { get; set; }
        public bool? seen { get; set; }
    }
}
