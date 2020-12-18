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
            private readonly IUserProfileReader _profileReader;

            public Handler(IUserProfileReader profileReader, IUserAccessor userAccessor)
            {
                _profileReader = profileReader;
            }

            public async Task<UserProfileDto> Handle(Query request, CancellationToken cancellationToken)
            {   
                return await _profileReader.ReadProfile(request.UserName);
            }
        }
    }
}
