using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Reactivities.Application.Errors;
using Reactivities.Domain.Models;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Auth
{
    public class Register
    {
        public class Command : IRequest
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly UserManager<AppUser> _userMgr;
            private readonly IMapper _mapper;

            public Handler(UserManager<AppUser> userMgr, IMapper mapper)
            {
                _userMgr = userMgr;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var result = await _userMgr.CreateAsync(_mapper.Map<AppUser>(request), request.Password);
                if (!result.Succeeded) throw new RestException(HttpStatusCode.BadRequest, new { 
                    errors = string.Join(", ", result.Errors.Select(e => e.Description))
                });

                return Unit.Value;
            }
        }
    }
}
