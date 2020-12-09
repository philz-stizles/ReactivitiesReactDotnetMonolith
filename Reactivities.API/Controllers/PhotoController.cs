using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Photos;

namespace Reactivities.API.Controllers
{
    [Authorize]
    public class PhotoController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromForm]Create.Command command)
        {
            var result = await Mediator.Send(command);
            return Ok(new { Status = true, Data = result, Message = "Photo uploaded successful" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });
            return Ok(new { Status = true, Data = result, Message = "Photo deleted successful"});
        }

        [HttpPost("{id}/SetMain")]
        public async Task<IActionResult> Patch(string id)
        {
            var result = await Mediator.Send(new SetMain.Command { Id = id });
            return Ok(new { Status = true, Data = result, Message = "Main Photo updated successful" });
        }
    }
}
