using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Auth;

namespace Reactivities.API.Controllers
{
    public class AuthController : BaseController
    {
        [HttpPost("Register")]
        public async Task<IActionResult> Register(Register.Command command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(Login.Query query)
        {
            var result = await Mediator.Send(query);
            return Ok(result);
        }
    }
}
