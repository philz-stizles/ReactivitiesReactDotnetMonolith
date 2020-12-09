using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Errors;
using Reactivities.Application.Interfaces;
using Reactivities.Domain.Models;
using Reactivities.Persistence;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Reactivities.Application.Photos
{
    public class SetMain
    {
        public class Command: IRequest {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly AppDbContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
                _photoAccessor = photoAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());
                if (existingUser == null) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access");

                var targetPhoto = existingUser.Photos.FirstOrDefault(p => p.Id == request.Id);
                if (targetPhoto == null) throw new RestException(HttpStatusCode.NotFound, "Photo does not exist");

                targetPhoto.IsMain = true;
                var mainPhoto = existingUser.Photos.FirstOrDefault(p => p.IsMain);
                mainPhoto.IsMain = false;

                var saveCount = await _context.SaveChangesAsync() > 0;
                if (!saveCount) throw new Exception("Problem saving changes");

                return Unit.Value;
            }
        }
    }
}