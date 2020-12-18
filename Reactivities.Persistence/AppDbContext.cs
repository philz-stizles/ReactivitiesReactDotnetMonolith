using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Reactivities.Domain.Models;

namespace Reactivities.Persistence
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Photo> Photos { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // builder.Entity<UserRole>(userRole => {
            //     // userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

            //     userRole
            //         .HasOne(e => e.AppUser)
            //         .WithMany(u => u.Roles)
            //         .HasForeignKey(e => e.UserId);

            //     userRole
            //         .HasOne(e => e.Role)
            //         .WithMany(r => r.Users)
            //         .HasForeignKey(e => e.RoleId);
            // });

                

            builder.Entity<UserActivity>(
                ua => ua.HasKey(ur => new { ur.AppUserId, ur.ActivityId })
            );

            builder.Entity<UserActivity>()
                .HasOne(e => e.AppUser)
                .WithMany(u => u.UserActivities)
                .HasForeignKey(e => e.AppUserId);

            builder.Entity<UserActivity>()
                .HasOne(e => e.Activity)
                .WithMany(a => a.ActivityUsers)
                .HasForeignKey(e => e.ActivityId);

            builder.Entity<UserFollowing>(
                ua => ua.HasKey(ur => new { ur.FollowerId, ur.FolloweeId })
            );

            builder.Entity<UserFollowing>()
                .HasOne(e => e.Follower)
                .WithMany(u => u.Followees)
                .HasForeignKey(e => e.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<UserFollowing>()
                .HasOne(e => e.Followee)
                .WithMany(a => a.Followers)
                .HasForeignKey(e => e.FolloweeId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}