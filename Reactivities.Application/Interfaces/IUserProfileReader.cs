using Reactivities.Application.User;
using System.Threading.Tasks;

namespace Reactivities.Application.Interfaces
{
    public interface IUserProfileReader
    {
        Task<UserProfileDto> ReadProfile(string username);
    }
}
