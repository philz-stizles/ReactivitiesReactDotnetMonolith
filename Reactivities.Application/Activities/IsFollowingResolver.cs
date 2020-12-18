using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Interfaces;
using Reactivities.Domain.Models;
using Reactivities.Persistence;
using System.Linq;

namespace Reactivities.Application.Activities
{
    public class IsFollowingResolver : IValueResolver<UserActivity, AttendeeDto, bool>
    {
        private readonly AppDbContext _context;
        private readonly IUserAccessor _userAccessor;

        public IsFollowingResolver(AppDbContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public bool Resolve(UserActivity source, AttendeeDto destination, bool destMember, ResolutionContext context)
        {
            var currentUser = _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName()).Result;

            if (currentUser.Followers.Any(f => f.FollowerId == source.AppUserId)) return true;

            return false;
        }
    }
}
