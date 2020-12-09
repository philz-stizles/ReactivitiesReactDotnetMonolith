using Microsoft.AspNetCore.Http;
using Reactivities.Application.Photos;
using System.Threading.Tasks;

namespace Reactivities.Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<FileUploadResponseDto> UploadFileAsync(IFormFile file);
        Task<string> DeleteFileAsync(string publicId);
    }
}
