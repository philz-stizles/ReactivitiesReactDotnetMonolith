using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Errors;
using Reactivities.Application.Interfaces;
using Reactivities.Domain.Models;
using Reactivities.Persistence;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Following
{
    public class Follow
    {
        public class Command: IRequest {
            [Required]
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly AppDbContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var follower = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());
                if (follower == null) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access");

                var followee = await _context.Users.FindAsync(request.Id);
                if (followee == null) throw new RestException(HttpStatusCode.NotFound, "User does not exist");
                
                var existingFollowing = await _context.UserFollowings
                    .SingleOrDefaultAsync(uf => uf.FollowerId == follower.Id && uf.FolloweeId == followee.Id);
                if (existingFollowing != null) throw new RestException(HttpStatusCode.NotFound, "You are already following this user");

                var following = new UserFollowing
                {
                   FollowerId = follower.Id,
                   FolloweeId = followee.Id
                };
                _context.UserFollowings.Add(following);

                var saveCount = await _context.SaveChangesAsync() > 0;
                if (!saveCount) throw new Exception("Problem saving changes");

                return Unit.Value;
            }
        }
    }
}