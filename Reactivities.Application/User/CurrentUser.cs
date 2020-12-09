using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Reactivities.Application.Auth;
using Reactivities.Application.Errors;
using Reactivities.Application.Interfaces;
using Reactivities.Domain.Models;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<LoggedInUserDto> { }

        public class Handler : IRequestHandler<Query, LoggedInUserDto>
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

            public async Task<LoggedInUserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var existingUser = await _userMgr.FindByEmailAsync(_userAccessor.GetCurrentEmail());
                if (existingUser == null) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access");
                
                var userDetails = _mapper.Map<UserDto>(existingUser);
                return new LoggedInUserDto
                {
                    UserDetails = userDetails,
                    Token = _jWTGenerator.CreateToken(existingUser)
                };
            }
        }
    }
}
