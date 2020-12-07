using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Reactivities.Domain.Models;
using Reactivities.Persistence;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Activities
{
    public class Create
    {
        public class Command: IRequest {
            public Guid Id { get; set; }
            [Required]
            public string Title { get; set; }
            [Required]
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            [Required]
            public string City { get; set; }
            [Required]
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly AppDbContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IHttpContextAccessor httpContextAccessor, IMapper mapper)
            {
                _context = context;
                _httpContextAccessor = httpContextAccessor;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(_mapper.Map<Activity>(request));

                // var user = _context.Users.SingleOrDefaultAsync(u => u.UserName = _httpContextAccessor.HttpContext.User.);
                // if (user == null)
                // {
                    // throw new Exception("Problem saving changes");
                // }
                _context.UserActivities.Add(new UserActivity { 

                });

                var success = await _context.SaveChangesAsync() > 0;
                if (!success) {
                    throw new Exception("Problem saving changes");
                }
                return Unit.Value;
            }
        }
    }
}