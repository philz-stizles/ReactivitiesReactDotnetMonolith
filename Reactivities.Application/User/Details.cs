using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Reactivities.Application.Errors;
using Reactivities.Application.Interfaces;
using Reactivities.Domain.Models;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.User
{
    public class Details
    {
        public class Query : IRequest<UserProfileDto> {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserProfileDto>
        {
            private readonly UserManager<AppUser> _userMgr;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly IJWTGenerator _jWTGenerator;

            public Handler(UserManager<AppUser> userMgr, IUserAccessor userAccessor, IMapper mapper, IJWTGenerator jWTGenerator)
            {
                _userMgr = userMgr;
                _userAccessor = userAccessor;
                _mapper = mapper;
                _jWTGenerator = jWTGenerator;
            }

            public async Task<UserProfileDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var existingUser = await _userMgr.FindByNameAsync(request.UserName);
                if (existingUser == null) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access");
                
                return _mapper.Map<UserProfileDto>(existingUser);
            }
        }
    }
}
