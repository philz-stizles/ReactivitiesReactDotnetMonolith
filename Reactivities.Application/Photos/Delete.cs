using AutoMapper;
using MediatR;
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
    public class Delete
    {
        public class Command: IRequest {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());
                if (existingUser == null) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access");

                var userPhoto = existingUser.Photos.FirstOrDefault(p => p.Id == request.Id);
                if (userPhoto == null) throw new RestException(HttpStatusCode.NotFound, "Photo does not exist");
                if (userPhoto.IsMain) throw new RestException(HttpStatusCode.BadRequest, "Main Photo cannot be delete");

                var deleteResult = await _photoAccessor.DeleteFileAsync(userPhoto.Id);
                if (deleteResult == null) throw new RestException(HttpStatusCode.InternalServerError, "Problem deleting the photo");

                existingUser.Photos.Remove(userPhoto);

                var success = await _context.SaveChangesAsync() > 0;
                if (!success) throw new RestException(HttpStatusCode.InternalServerError, "Problem saving changes");
   

                return Unit.Value;
            }
        }
    }
}