using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Reactivities.Domain.Models
{
    public class AppUser: IdentityUser
    {
        public string DisplayName { get; set; }
        public virtual ICollection<UserActivity> Activities { get; set; }
        public virtual ICollection<UserRole> Roles { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
    }
}