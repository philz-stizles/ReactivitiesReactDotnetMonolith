using Reactivities.Domain.Models;

namespace Reactivities.Application.Interfaces
{
    public interface IJWTGenerator
    {
        public string CreateToken(AppUser user);
    }
}
