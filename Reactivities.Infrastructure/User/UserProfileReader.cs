using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Errors;
using Reactivities.Application.Interfaces;
using Reactivities.Application.User;
using Reactivities.Persistence;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Reactivities.Infrastructure.User
{
    public class UserProfileReader : IUserProfileReader
    {
        private readonly AppDbContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public UserProfileReader(AppDbContext context, IUserAccessor userAccessor, IMapper mapper)
        {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<UserProfileDto> ReadProfile(string username)
        {
            var currentUser = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());
            if (currentUser == null) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access");

            var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
            if (existingUser == null) throw new RestException(HttpStatusCode.NotFound, "User not found");

            var userProfileDto = _mapper.Map<UserProfileDto>(existingUser);

            if (existingUser.Followers.Any(uf => uf.FollowerId == currentUser.Id)) userProfileDto.IsFollowed = true;

            return userProfileDto;
        }
    }
}
