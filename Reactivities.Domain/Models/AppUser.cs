using Microsoft.AspNetCore.Identity;

namespace Reactivities.Domain.Models
{
    public class AppUser: IdentityUser
    {
        public string DisplayName { get; set; }
    }
}