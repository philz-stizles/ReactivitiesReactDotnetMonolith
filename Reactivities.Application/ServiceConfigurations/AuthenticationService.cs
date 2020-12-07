using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Reactivities.Application.ServiceConfigurations
{
    public static class AuthenticationService
    {
        public static void AddAuthenticationServices(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddAuthentication()
                .AddMicrosoftAccount(options => {
                    options.ClientId = Configuration["Authentication:Microsoft:ClientId"];
                    options.ClientSecret =Configuration["Authentication:Microsoft:ClientSecret"];
                })
                .AddGoogle(options => {
                    IConfigurationSection googleAuthSection = Configuration.GetSection("Authentication:Google");
                    options.ClientId = googleAuthSection["ClientId"];
                    options.ClientSecret = googleAuthSection["ClientSecret"];
                })
                .AddTwitter(options => {
                    options.ConsumerKey = Configuration["Authentication:Twitter:ConsumerAPIKey"];
                    options.ConsumerSecret = Configuration["Authentication:Twitter:ConsumerSecret"];
                    options.RetrieveUserDetails = true;
                })
                .AddFacebook(options => {
                    options.AppId = Configuration["Authentication:Facebook:AppId"];
                    options.AppSecret = Configuration["Authentication:Facebook:AppSecret"];
                });
        }
    }
}