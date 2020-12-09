using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Reactivities.Application.Errors;
using Reactivities.Application.Interfaces;
using Reactivities.Application.Photos;
using System.Threading.Tasks;

namespace Reactivities.Infrastructure.Photos
{
    public class PhotoAccessor: IPhotoAccessor
    {
        private readonly IOptions<CloudinarySettings> _cloudinarySettings;
        private Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> cloudinarySettings, ILogger<PhotoAccessor> logger)
        {
            _cloudinarySettings = cloudinarySettings;

            var acc = new Account(
                _cloudinarySettings.Value.CloudName,
                _cloudinarySettings.Value.ApiKey,
                _cloudinarySettings.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        public async Task<FileUploadResponseDto> UploadFileAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                            .Width(500)
                            .Height(500)
                            .Crop("fill")
                            .Gravity("face")
                    };

                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
            }

            if (uploadResult.Error != null) throw new RestException(System.Net.HttpStatusCode.InternalServerError, uploadResult.Error.Message);

            return new FileUploadResponseDto{
                Url = uploadResult.Url.ToString(),
                PublicId = uploadResult.PublicId
            };
        }

        public async Task<string> DeleteFileAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            var deletionResult = await _cloudinary.DestroyAsync(deleteParams);

            return (deletionResult.Result.ToLower() == "ok") ? deletionResult.Result : null ;
        }
    }
}