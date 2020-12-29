using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.User;

namespace Reactivities.API.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> Get(string username)
        {
            var result = await Mediator.Send(new Details.Query { UserName = username });
            return Ok(new { Status = true, Message="Profile retrieved successfully", Data = result });
        }

        [HttpPatch]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }
    }
}
