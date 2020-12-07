using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
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
                _context.Activities.Add(_mapper.Map<Activity>(request));

                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());
                if (user == null) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access");

                // _context.UserActivities.Add(new UserActivity { 


                var success = await _context.SaveChangesAsync() > 0;
                if (!success) {
                    throw new Exception("Problem saving changes");
                }
                return Unit.Value;
            }
        }
    }
}