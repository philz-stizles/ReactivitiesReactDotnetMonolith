using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Domain.Models;
using Reactivities.Persistence;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Activities
{
    public class Create
    {
        public class Command: IRequest {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(_mapper.Map<Activity>(request));
                var success = await _context.SaveChangesAsync() > 0;
                if (!success) {
                    throw new Exception("Problem saving changes");
                }
                return Unit.Value;
            }
        }
    }
}