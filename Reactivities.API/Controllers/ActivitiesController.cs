using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Activities;

namespace Reactivities.API.Controllers
{
    [Authorize]
    public class ActivitiesController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Get(int? skip, int? take)
        {
            var result = await Mediator.Send(new List.Query(skip, take));
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });
            return Ok(new { Status = true, Data = result, Message = "Activity retrieved successful" });
        }

        [HttpPost]
        public async Task<IActionResult> Post(Create.Command command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, Edit.Command command)
        {
            command.Id = id;
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });
            return Ok(new { Status = true, Data = result, Message = "Activity deleted successful"});
        }

        [HttpPost("{id}/Attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            var result = await Mediator.Send(new Attend.Command { Id = id });
            return Ok(new { Status = true, Data = result, Message = "Attendance created Successfully" });
        }

        [HttpDelete("{id}/Attend")]
        public async Task<IActionResult> UnAttend(Guid id)
        {
            var result = await Mediator.Send(new UnAttend.Command { Id = id });
            return Ok(new { Status = true, Data = result, Message = "You have successfully unattended an activity" });
        }
    }
}
