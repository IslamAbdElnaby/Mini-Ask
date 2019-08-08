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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext context;
        private readonly IMapper mapper;
        public PostsController(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("{action}/{userId}")]
        public int GetNotificationCount(int userId)
        {
            var c1 = context.Posts
                .Count(a => (a.qSeen != true && a.answered != true && a.recvUserId == userId) ||
                (a.ansSeen != true && a.answered == true && a.sendUserId == userId));
            var c2 = context.Likes
                .Include(l => l.post)
                .Count(a => a.seen != true && a.post.recvUserId == userId);
            return c1 + c2;
        }

        [HttpPost("{action}/{id}")]
        public async Task SetLikeSeen(int id)
        {
            try
            {
                var model = await context.Likes.SingleAsync(l => l.id == id);
                model.seen = true;
                context.SaveChanges();
            }
            catch { }
        }

        [HttpPost("{action}/{id}")]
        public async Task SetAnsSeen(int id)
        {
            try
            {
                var model = await context.Posts.SingleAsync(q => q.id == id);
                model.ansSeen = true;
                context.SaveChanges();
            }
            catch { }
        }
        [HttpPost("{action}/{id}")]
        public async Task SetQSeen(int id)
        {
            try
            {
                var model = await context.Posts.SingleAsync(q => q.id == id);
                model.qSeen = true;
                context.SaveChanges();
            }
            catch { }
        }

        [HttpGet("getPost/{id}")]
        public async Task<ActionResult<PostDto>>GetPostById(int id)
        {
            var post = await context.Posts
                .Include(p => p.Likes)
                .SingleAsync(p => p.id == id);
            return mapper.Map<Post, PostDto>(post);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetUserPosts(string id)
        {
            var posts = await context.Posts.Include(p => p.Likes)
                .Where(p => p.recvUser.IdentityId == id && p.answered == true)
                .ToListAsync();
            return mapper.Map<List<Post>, List<PostDto>>(posts);
        }

        [HttpGet("{action}/{id}")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetHomePosts(string id)
        {
            var askUser = await context.AskUsers.SingleAsync(u => u.IdentityId == id);
            var listId = await context.Followers
                .Where(f => f.followerId == askUser.id)
                .Select(f => f.userId).ToListAsync();
            listId.Add(askUser.id);

            var posts = await context.Posts.Include(p => p.Likes)
                .Where(p => listId.Contains(p.recvUserId) && p.answered == true)
                .ToListAsync();
            return mapper.Map<List<Post>, List<PostDto>>(posts);
        }

        [HttpGet("question/{id}")]
        public PostDto Get(int id)
        {
            try
            {
                return mapper.Map<Post, PostDto>(context.Posts.Single(p => p.id == id));
            }
            catch { return null; }
        }

        [HttpPost]
        public async Task PostAsync([FromBody] PostDto post)
        {
            try
            {
                Post model = mapper.Map<PostDto, Post>(post);
                model.date = DateTime.Now;
                await context.Posts.AddAsync(model);
                await context.SaveChangesAsync();
            }
            catch (Exception e) { }
        }

        [HttpPut("answer/{id}/{answer}")]
        public async Task PutAsync(int id, string answer)
        {
            try
            {
                var post = await context.Posts.SingleAsync(p => p.id == id);
                post.date = DateTime.Now;
                post.answer = answer;
                post.answered = true;
                await context.SaveChangesAsync();
            }
            catch { }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                context.Posts.Remove(context.Posts.Single(p => p.id == id));
                context.SaveChanges();
            }
            catch { }
        }

        [HttpPost("setLike/{postId}/{reactUserId}")]
        public async Task<ActionResult<bool>> SetLike(int postId, string reactUserId)
        {
            try
            {
                var userId = context.AskUsers.Single(u => u.IdentityId == reactUserId).id;
                var model = new Like()
                {
                    postId = postId,
                    reactUserId = userId
                };
                var liked = await context.Likes
                    .SingleOrDefaultAsync(l => l.postId == postId && l.reactUserId == userId);
                if (liked != null) context.Likes.Remove(liked);
                else await context.Likes.AddAsync(model);
                await context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        
    }
}
