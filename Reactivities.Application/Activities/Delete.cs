using AutoMapper;
using MediatR;
using Reactivities.Domain.Models;
using Reactivities.Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Activities
{
    public class Delete
    {
        public class Command: IRequest<Activity> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Activity>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Activity> Handle(Command request, CancellationToken cancellationToken)
            {
                var existingActivity = _context.Activities.Find(request.Id);
                if (existingActivity == null) {
                    throw new Exception("Activity does not exist");
                }

                _context.Activities.Remove(existingActivity);
                var success = await _context.SaveChangesAsync() > 0;
                if (!success) {
                    throw new Exception("Problem saving changes");
                }
                return existingActivity;
            }
        }
    }
}