using System.Threading.Tasks;

namespace Reactivities.Application.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string emailSubject, string emailBody);
    }
}
