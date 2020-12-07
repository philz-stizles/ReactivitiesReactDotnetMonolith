namespace Reactivities.Application.Auth
{
    public class LoggedInUserDto
    {
        public string Token { get; set; }
        public UserDto UserDetails { get; set; }
    }

    public class UserDto
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
    }
}
