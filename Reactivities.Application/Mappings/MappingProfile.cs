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
            CreateMap<Register.Command, AppUser>();
            CreateMap<AppUser, UserDto>().ReverseMap();
        }
    }
}
