using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Reactivities.Application.Errors;
using Reactivities.Application.Interfaces;
using Reactivities.Domain.Models;
using Reactivities.Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.User
{
    public class Edit
    {
        public class Command: IRequest {
            public string DisplayName { get; set; }
            public string Bio { get; set; }
        }

        public class QueryValidator : AbstractValidator<Command>
        {
            public QueryValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Bio).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userMgr;

            public Handler(IMapper mapper, IUserAccessor userAccessor, UserManager<AppUser> userMgr)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _userMgr = userMgr;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var existingUser = await _userMgr.FindByIdAsync(_userAccessor.GetCurrentUserId());
                if (existingUser == null) throw new RestException(HttpStatusCode.NotFound, "User does not exist");

                existingUser.DisplayName = request.DisplayName ?? existingUser.DisplayName;
                existingUser.Bio = request.Bio ?? existingUser.Bio;

                var isSaved = await _userMgr.UpdateAsync(existingUser);
                if (!isSaved.Succeeded) throw new Exception("Problem saving changes");

                return Unit.Value;
            }
        }
    }
}