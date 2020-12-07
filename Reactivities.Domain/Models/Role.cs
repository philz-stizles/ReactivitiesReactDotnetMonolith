using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Reactivities.Domain.Models
{
    [Table("Roles")]
    public class Role: IdentityRole
    {
        public virtual ICollection<UserRole> Users { get; set; }
    }
}