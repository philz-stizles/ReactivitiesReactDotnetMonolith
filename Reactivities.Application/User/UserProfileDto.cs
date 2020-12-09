using Reactivities.Application.Photos;
using System.Collections.Generic;

namespace Reactivities.Application.User
{
    public class UserProfileDto
    {
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}
