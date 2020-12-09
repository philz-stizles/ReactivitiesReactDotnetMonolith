using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Reactivities.Application.Errors;
using Reactivities.Application.Interfaces;
using Reactivities.Domain.Models;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Auth
{
    public class RegisterWithReturnToken
    {
        public class Command : IRequest<LoggedInUserDto>
        {
            public string Email { get; set; }
            public string UserName { get; set; }
            public string DisplayName { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, LoggedInUserDto>
        {
            private readonly UserManager<AppUser> _userMgr;
            private readonly IMapper _mapper;
            private readonly IJWTGenerator _jWTGenerator;

            public Handler(UserManager<AppUser> userMgr, IMapper mapper, IJWTGenerator jWTGenerator)
            {
                _userMgr = userMgr;
                _mapper = mapper;
                _jWTGenerator = jWTGenerator;
            }

            public async Task<LoggedInUserDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var newUser = _mapper.Map<AppUser>(request);
                var result = await _userMgr.CreateAsync(newUser, request.Password);
                if (!result.Succeeded) throw new RestException(HttpStatusCode.BadRequest, new { 
                    errors = string.Join(", ", result.Errors.Select(e => e.Description))
                });

                return new LoggedInUserDto
                {
                    UserDetails = _mapper.Map<UserDto>(newUser),
                    Token = _jWTGenerator.CreateToken(newUser)
                };
            }
        }
    }
}
