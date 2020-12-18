using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Domain.Models;
using Reactivities.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Activities
{
    public class List
    {
        public class PagedActivities
        {
            public List<ActivityDto> Activities{ get; set; }
            public int Count{ get; set; }
        }

        public class Query: IRequest<PagedActivities> 
        {
            public Query(int? skip, int? take, bool isGoing, bool isHost, DateTime? startDate)
            {
                Skip = skip;
                Take = take;
                IsGoing = isGoing;
                IsHost = isHost;
                StartDate = startDate;
            }

            public int? Skip { get; set; }
            public int? Take{ get; set; }
            public bool IsHost { get; set; }
            public bool IsGoing { get; set; }
            public DateTime? StartDate { get; set; }
        }

        public class Handler : IRequestHandler<Query, PagedActivities>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<PagedActivities> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Activities
                    // .Where(a => a.Date >= request.StartDate)
                    .OrderBy(a => a.Date)
                    .AsQueryable();

                if (request.IsGoing && !request.IsHost) { 

                }

                var activities = await query
                .Include(a => a.ActivityUsers).ThenInclude(au => au.AppUser)
                .Skip(request.Skip ?? 0)
                .Take(request.Take ?? 10) 
                .ToListAsync();

                return new PagedActivities{
                    Activities = _mapper.Map<List<ActivityDto>>(activities),
                    Count = query.Count()
                };
            }
        }
    }
}