using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Reactivities.Application.Errors;
using Reactivities.Application.Interfaces;
using Reactivities.Domain.Models;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Auth
{
    public class Login
    {
        public class Query : IRequest<LoggedInUserDto>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, LoggedInUserDto>
        {
            private readonly UserManager<AppUser> _userMgr;
            private readonly SignInManager<AppUser> _signInMgr;
            private readonly IMapper _mapper;
            private readonly IJWTGenerator _jWTGenerator;

            public Handler(UserManager<AppUser> userMgr, SignInManager<AppUser> signInMgr, IMapper mapper, IJWTGenerator jWTGenerator)
            {
                _userMgr = userMgr;
                _signInMgr = signInMgr;
                _mapper = mapper;
                _jWTGenerator = jWTGenerator;
            }

            public async Task<LoggedInUserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var existingUser = await _userMgr.FindByEmailAsync(request.Email);
                if (existingUser == null) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access");

                var result = await _signInMgr.CheckPasswordSignInAsync(existingUser, request.Password, false);
                if (!result.Succeeded) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access"); ;
                
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
