using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FirstWebCore.Databases;
using FirstWebCore.DTOModels;
using FirstWebCore.Models;
using FirstWebCore.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FirstWebCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext context;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly IMapper mapper;
        private readonly UserManager<IdentityUser> manager;

        public AuthController(SignInManager<IdentityUser> signInManager, IMapper mapper,

            UserManager<IdentityUser> manager, AppDbContext context)
        {
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.manager = manager;
            this.context = context;
        }
        // GET: api/Students
        [HttpGet("get")]
        public async Task<UserViewModel> GetAsync()
        {
            var user = await manager.FindByNameAsync(User.Identity.Name);
            return new UserViewModel() { name = user.UserName, id = user.Id };
            
        }
        [HttpGet("allUsers")]
        public async Task<ActionResult<IEnumerable<AskUserDto>>> GetUsers()
        {
            var users = await context.AskUsers.ToListAsync();
            return mapper.Map<List<AskUser>, List<AskUserDto>>(users);
        }
        [HttpGet("{action}")]
        public bool IsSignedIn()
        {
            return this.signInManager.IsSignedIn(User) ? true : false;
        }

        // GET: api/Students/5
        

        // POST: api/Students
        [HttpPost("login")]
        public async Task<bool> Login([FromBody] UserViewModel user)
        {
            var res = await this.signInManager.PasswordSignInAsync(user.name, user.password, false, false);
            return res.Succeeded;
        }
        [HttpPost("register")]
        public async Task<bool> Register([FromBody] UserViewModel user)
        {
            var newUser = new IdentityUser() { UserName = user.name, Email = user.email };
            var reg = await this.manager.CreateAsync(newUser, user.password);
            if (!reg.Succeeded) return false;
           
            var res = await this.signInManager.PasswordSignInAsync(user.name, user.password, false, false);
            if (!res.Succeeded) return false;
            try
            {
                var model = new AskUser()
                {
                    IdentityId = newUser.Id,
                    email = newUser.Email,
                    name = newUser.UserName
                };
                await context.AskUsers.AddAsync(model);
                await context.SaveChangesAsync();
            }
            catch(Exception e) { }
            return res.Succeeded;
        }
        [HttpPost("logout")]
        public async Task<bool> Logout()
        {
            try
            {
                await this.signInManager.SignOutAsync();
                return true;
            }
            catch { return false; }
        }
        [HttpGet("{action}/{id}")]
        public async Task<AskUserDto> GetAskUserById(int id)
        {
            var model = await context.AskUsers.SingleAsync(u => u.id == id);
            var askUser = mapper.Map<AskUser, AskUserDto>(model);
            return askUser;
        }
        [HttpGet("{action}/{identityId}")]
        public async Task<AskUserDto> GetAskUserByIdentityId(string identityId)
        {
            var model = await context.AskUsers.SingleAsync(u => u.IdentityId == identityId);
            var askUser = mapper.Map<AskUser, AskUserDto>(model);
            return askUser;
        }
    }
}
