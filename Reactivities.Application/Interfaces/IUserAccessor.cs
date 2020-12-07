namespace Reactivities.Application.Interfaces
{
    public interface IUserAccessor
    {
        public string GetCurrentUserId();
        public string GetCurrentEmail();
        public string GetCurrentUserName();
    }
}
