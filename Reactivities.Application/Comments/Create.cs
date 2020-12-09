using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Errors;
using Reactivities.Domain.Models;
using Reactivities.Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Comments
{
    public class Create
    {
        public class Command: IRequest<CommentDto>{
            public string Body { get; set; }
            public string Username { get; set; }
            public Guid ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var existingActivity = await _context.Activities.FindAsync(request.ActivityId);
                if (existingActivity == null) throw new RestException(HttpStatusCode.NotFound, "Activity not found");

                var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.UserName == request.Username);
                if (existingUser == null) throw new Exception("User not found");

                var newComment = new Comment
                {
                    Author = existingUser,
                    Activity = existingActivity,
                    CreatedAt = DateTime.Now,
                    Body = request.Body
                };

                _context.Comments.Add(newComment);

                var success = await _context.SaveChangesAsync() > 0;
                if (!success) throw new Exception("Problem saving changes");

                return _mapper.Map<CommentDto>(newComment);
            }
        }
    }
}