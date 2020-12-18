using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Following;

namespace Reactivities.API.Controllers
{
    // [Authorize]
    [Route("api/profiles")]
    public class FollowingController : BaseController
    {
        [HttpGet("{username}/follow")]
        public async Task<IActionResult> GetFollowings(string username, string predicate, int? skip, int? take)
        {
            var result = await Mediator.Send(new List.Query { 
                Username = username,
                Predicate = predicate,
                Skip = skip,
                Take = take
            });
            return Ok(result);
        } 

        [HttpPost("{userId}/follow")]
        public async Task<IActionResult> Follow(string userId)
        {
            var result = await Mediator.Send(new Follow.Command { Id = userId});
            return Ok(result);
        }


        [HttpDelete("{userId}/follow")]
        public async Task<IActionResult> Unfollow(string userId)
        {
            var result = await Mediator.Send(new UnFollow.Command { Id = userId });
            return Ok(new { Status = true, Data = result, Message = "Activity deleted successful"});
        }
    }
}
