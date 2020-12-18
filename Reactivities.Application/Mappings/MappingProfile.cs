using AutoMapper;
using Reactivities.Application.Activities;
using Reactivities.Application.Auth;
using Reactivities.Application.Comments;
using Reactivities.Domain.Models;
using System.Linq;

namespace Reactivities.Application.Mappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Activities.Create.Command, Activity>();
            CreateMap<Comment, CommentDto>()
                .ForMember(cd => cd.Username, opt => opt.MapFrom(c => c.Author.UserName))
                .ForMember(cd => cd.DisplayName, opt => opt.MapFrom(c => c.Author.DisplayName))
                .ForMember(cd => cd.Image, opt => opt.MapFrom(c => c.Author.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<Activity, ActivityDto>().ReverseMap();

            // AppUser
            CreateMap<RegisterWithReturnToken.Command, AppUser>();
            CreateMap<AppUser, UserDto>().ReverseMap();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(ad => ad.DisplayName, opt => opt.MapFrom(ua => ua.AppUser.DisplayName))
                .ForMember(ad => ad.UserName, opt => opt.MapFrom(ua => ua.AppUser.UserName))
                .ForMember(ad => ad.Image, opt => opt.MapFrom(ua => ua.AppUser.Photos.SingleOrDefault(p => p.IsMain).Url));
                // .ForMember(ad => ad.IsFollowing, opt => opt.MapFrom<IsFollowingResolver>());

            CreateMap<AppUser, User.UserProfileDto>()
                .ForMember(up => up.Image, opt => opt.MapFrom(au => au.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(up => up.FollowerCount, opt => opt.MapFrom(au => au.Followers.Count()))
                .ForMember(up => up.FolloweeCount, opt => opt.MapFrom(au => au.Followees.Count()));
        }
    }
}
