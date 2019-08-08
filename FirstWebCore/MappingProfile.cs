using AutoMapper;
using FirstWebCore.DTOModels;
using FirstWebCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstWebCore
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Like, LikeDto>()
                .ForMember(l => l.answer, opt => opt.MapFrom(l => l.post.answer));
            CreateMap<LikeDto, Like>()
                .ForMember(l => l.id, opt => opt.Ignore());

            CreateMap<Follower, FollowerDto>();
            CreateMap<FollowerDto, Follower>()
                .ForMember(f => f.id, opt => opt.Ignore());

            CreateMap<Post, PostDto>();
            CreateMap<PostDto, Post>()
                .ForMember(p => p.id, opt => opt.Ignore());

            CreateMap<AskUser, AskUserDto>();
            CreateMap<AskUserDto, AskUser>()
                .ForMember(a => a.id, opt => opt.Ignore());
        }
    }
}
