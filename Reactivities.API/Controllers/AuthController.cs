using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Auth;
using Reactivities.Application.User;

namespace Reactivities.API.Controllers
{
    public class AuthController : BaseController
    {
        [HttpPost("RegisterWithReturnToken")]
        public async Task<IActionResult> RegisterWithReturnToken(RegisterWithReturnToken.Command command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpPost("RegisterWithVerifyEmail")]
        public async Task<IActionResult> RegisterWithVerifyEmail(RegisterWithVerifyEmail.Command command)
        {
            var origin = Request.Headers["origin"];
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(Login.Query query)
        {
            var result = await Mediator.Send(query);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("CurrentUser")]
        public async Task<IActionResult> CurrentUser()
        {
            var result = await Mediator.Send(new CurrentUser.Query { });
            return Ok(result);
        }
    }
}
