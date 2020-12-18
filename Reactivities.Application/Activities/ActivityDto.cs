using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Reactivities.Application.Comments;

namespace Reactivities.Application.Activities
{
    public class ActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public virtual ICollection<CommentDto> Comments { get; set; }

        [JsonPropertyName("attendees")]
        public virtual ICollection<AttendeeDto> ActivityUsers { get; set; }
    }

    public class AttendeeDto
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public bool IsHost { get; set; }
        public bool IsFollowing { get; set; }
    }
}