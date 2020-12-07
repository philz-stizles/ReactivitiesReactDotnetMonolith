using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Reactivities.Domain.Models
{
    [Table("UserRoles")]
    public class UserRole: IdentityUserRole<string>
    {
        public virtual AppUser AppUser { get; set; }
        public virtual Role Role { get; set; }
    }
}