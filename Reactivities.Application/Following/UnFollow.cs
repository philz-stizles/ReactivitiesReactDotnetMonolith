using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Errors;
using Reactivities.Application.Interfaces;
using Reactivities.Domain.Models;
using Reactivities.Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Following
{
    public class UnFollow
    {
        public class Command: IRequest {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var follower = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());
                if (follower == null) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access");

                var followee = await _context.Users.FindAsync(request.Id);
                if (followee == null) throw new RestException(HttpStatusCode.NotFound, "User does not exist");
                
                var existingFollowing = await _context.UserFollowings
                    .SingleOrDefaultAsync(uf => uf.FollowerId == follower.Id && uf.FolloweeId == followee.Id);
                if (existingFollowing == null) throw new RestException(HttpStatusCode.NotFound, "You are not following this user");

                _context.UserFollowings.Remove(existingFollowing);
                var success = await _context.SaveChangesAsync() > 0;
                if (!success) {
                    throw new RestException(HttpStatusCode.InternalServerError, "Problem saving changes");
                }
                return Unit.Value;
            }
        }
    }
}