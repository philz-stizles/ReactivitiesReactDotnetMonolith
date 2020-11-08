using AutoMapper;
using Reactivities.Application.Activities;
using Reactivities.Application.Comments.Dtos;
using Reactivities.Domain.Models;

namespace Reactivities.Application.Mappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, Activity>();
            CreateMap<Comment, CommentDto>();
        }
    }
}
