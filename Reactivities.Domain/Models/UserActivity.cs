using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Reactivities.Domain.Models
{
    [Table("UsersActivities")]
    public class UserActivity
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public bool IsHost { get; set; }
        public DateTime DateJoined { get; set; }
    }
}