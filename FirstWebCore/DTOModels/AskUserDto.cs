using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstWebCore.DTOModels
{
    public class AskUserDto
    {
        public int id { get; set; }
        public string IdentityId { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string photoPath { get; set; }
        public ICollection<PostDto> Posts { get; set; }
        public ICollection<FollowerDto> Followers { get; set; }
        public AskUserDto()
        {
            Posts = new List<PostDto>();
            Followers = new List<FollowerDto>();
        }
    }
}
