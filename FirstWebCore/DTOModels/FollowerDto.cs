using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstWebCore.DTOModels
{
    public class FollowerDto
    {
        public int id { get; set; }
        public int userId { get; set; }
        public int followerId { get; set; }
    }
}
