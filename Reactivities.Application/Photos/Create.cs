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
    public class Create
    {
        public class Command: IRequest<PhotoDto> {
            public IFormFile File{ get; set; }
        }

        public class Handler : IRequestHandler<Command, PhotoDto>
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

            public async Task<PhotoDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());
                if (existingUser == null) throw new RestException(HttpStatusCode.Unauthorized, "Unauthorized access");

                var uploadResult = await _photoAccessor.UploadFileAsync(request.File);
                var newPhoto = new Photo
                {
                    Url = uploadResult.Url,
                    Id = uploadResult.PublicId
                };
                if (!existingUser.Photos.Any(p => p.IsMain)) newPhoto.IsMain = true;
                existingUser.Photos.Add(newPhoto);

                 
                var saveCount = await _context.SaveChangesAsync() > 0;
                if (!saveCount) throw new Exception("Problem saving changes");

                return _mapper.Map<PhotoDto>(newPhoto); ;
            }
        }
    }
}