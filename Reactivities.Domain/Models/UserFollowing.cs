using System.ComponentModel.DataAnnotations.Schema;

namespace Reactivities.Domain.Models
{
    [Table("UserFollowings")]
    public class UserFollowing
    {
        public string FollowerId { get; set; }
        public virtual AppUser Follower { get; set; }
        public string FolloweeId { get; set; }
        public virtual AppUser Followee { get; set; }
    }
} 