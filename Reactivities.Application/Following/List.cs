using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Interfaces;
using Reactivities.Application.User;
using Reactivities.Domain.Models;
using Reactivities.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Following
{
    public class List
    {
        public class PagedFollowers
        {
            public List<UserProfileDto> Followers{ get; set; }
            public int Count{ get; set; }
        }

        public class Query: IRequest<PagedFollowers> 
        {
            public int? Skip { get; set; }
            public int? Take{ get; set; }
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, PagedFollowers>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;
            private readonly IUserProfileReader _profileReader;

            public Handler(AppDbContext context, IMapper mapper, IUserProfileReader profileReader)
            {
                _context = context;
                _mapper = mapper;
                _profileReader = profileReader;
            }

            public async Task<PagedFollowers> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.UserFollowings.AsQueryable();

                var userFollowings = new List<UserFollowing>();

                var profiles = new List<UserProfileDto>();

                switch (request.Predicate)
                {
                    case "followers":
                        query = query.Where(uf => uf.Followee.UserName == request.Username)
                            .Skip(request.Skip ?? 0)
                            .Take(request.Take ?? 10);
                        break;

                    case "followees":
                        query = query.Where(uf => uf.Follower.UserName == request.Username)
                            .Skip(request.Skip ?? 0)
                            .Take(request.Take ?? 10);
                        break;
                }

                userFollowings = await query.ToListAsync();

                return new PagedFollowers
                {
                    Followers = _mapper.Map<List<UserProfileDto>>(userFollowings),
                    Count = query.Count()
                };
            }
        }
    }
}