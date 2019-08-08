using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FirstWebCore.Databases;
using FirstWebCore.DTOModels;
using FirstWebCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FirstWebCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext context;
        private readonly IMapper mapper;

        public ProfileController(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        // GET: api/Profile
        [HttpGet("{id}")]
        public async Task<ActionResult<AskUserDto>> GetAsync(string id)
        {
            var profile = await context.AskUsers
                .Include(a => a.Followers)
                .Include(a => a.Posts).ThenInclude(post => post.Likes)
                .SingleOrDefaultAsync(u => u.IdentityId == id);
            return mapper.Map<AskUser, AskUserDto>(profile);
        }

        [HttpGet("likes/{id}")]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetLikes(string id)
        {
            var likes = await context.Likes
                .Include(l => l.post)
                .Where(l => l.post.recvUser.IdentityId == id)
                .ToListAsync();
            return mapper.Map<List<Like> ,List <LikeDto>>(likes);
        }

        [HttpGet("questions/{id}")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetQuestions(string id)
        {
            var profile = await context.AskUsers
                .Include(a => a.Posts)
                .SingleOrDefaultAsync(u => u.IdentityId == id);
            var questions = profile.Posts.Where(p => p.answered == false).ToList();
            return mapper.Map<List<Post>, List<PostDto>>(questions);
        }

        [HttpGet("answers/{id}")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetAnswers(string id)
        {
            var user = await context.AskUsers.SingleAsync(a => a.IdentityId == id);
            var answers = await context.Posts
                .Where(p => p.sendUserId == user.id && p.answered == true)
                .ToListAsync();
            return mapper.Map<List<Post>, List<PostDto>>(answers);
        }

        // POST: api/Profile
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Profile/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] AskUserDto user)
        {
            try
            {
                var model = mapper.Map<AskUserDto, AskUser>(user);
                context.Attach(model);
                context.Entry(model).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            }
            catch { }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task DeleteAsync(string id)
        {
            try
            {
                var model = await context.AskUsers.SingleAsync(u => u.IdentityId == id);
                context.AskUsers.Remove(model);
                context.SaveChanges();
            }
            catch { }
        }

        [HttpGet("{action}/{userId}/{followerId}")]
        public async Task<bool> following(string userId, string followerId)
        {
            try
            {
                var f = await context.AskUsers.SingleAsync(u => u.IdentityId == followerId);
                return context.Followers
                    .Single(a => a.followerId == f.id && a.user.IdentityId == userId) != null;
            }
            catch
            {
                return false;
            }
        }
        
        [HttpPost("{action}/{userId}/{followerId}")]
        public async Task follow(string userId, string followerId)
        {
            var user = await context.AskUsers.SingleAsync(u => u.IdentityId == userId);
            var f = await context.AskUsers.SingleAsync(u => u.IdentityId == followerId);
            var follower = new Follower()
            {
                userId = user.id,
                followerId = f.id
            };
            try
            {
                var model = await context.Followers
                     .SingleAsync(fol => fol.userId == follower.userId && fol.followerId == follower.followerId);
                context.Followers.Remove(model);
            }
            catch { await context.Followers.AddAsync(follower); }
            await context.SaveChangesAsync();
        }

        [HttpGet("friends/{id}")]
        public async Task<ActionResult<IEnumerable<FollowerDto>>> GetFriends(string id)
        {
            var userId = context.AskUsers.Single(u => u.IdentityId == id).id;
            var followers = await context.Followers
                .Where(f => f.followerId == userId)
                .ToListAsync();

            return mapper.Map<List<Follower>, List<FollowerDto>>(followers);
        }
    }
}
