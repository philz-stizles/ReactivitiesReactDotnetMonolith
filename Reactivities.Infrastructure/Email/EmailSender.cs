using Microsoft.Extensions.Options;
using Reactivities.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Infrastructure.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly SendGridSettings _sendGridSettings;

        public EmailSender(IOptions<SendGridSettings> sendGridSettings)
        {
            _sendGridSettings = sendGridSettings.Value;
        }

        public Task SendEmailAsync(string email, string emailSubject, string emailBody)
        {
            // var client = new SendGridClient
            throw new NotImplementedException();
        }
    }
}
