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

namespace Reactivities.Application.Activities
{
    public class UnAttend
    {
        public class Command: IRequest {
            public Guid Id { get; set; }
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
                var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());
                if (existingUser == null) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access");

                var existingActivity = await _context.Activities.FindAsync(request.Id);
                if (existingActivity == null) throw new RestException(HttpStatusCode.NotFound, "Activity does not exist");

                var existingAttendance = await _context.UserActivities
                    .SingleOrDefaultAsync(ua => ua.ActivityId == request.Id && ua.AppUserId == existingUser.Id);

                if (existingAttendance == null) throw new RestException(HttpStatusCode.BadRequest, "You are not in attendance of this activity");

                if (existingAttendance.IsHost) throw new RestException(HttpStatusCode.BadRequest, "You are the host of this activity");
                
                _context.UserActivities.Remove(existingAttendance);

                var saveCount = await _context.SaveChangesAsync() > 0;
                if (!saveCount) throw new Exception("Problem saving changes");

                return Unit.Value;
            }
        }
    }
}