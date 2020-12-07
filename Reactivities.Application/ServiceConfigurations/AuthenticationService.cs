using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Reactivities.Application.ServiceConfigurations
{
    public static class AuthenticationService
    {
        public static void AddAuthenticationServices(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        System.Text.Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSettings:JWTToken").Value)
                    ),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // ValidateLifetime = false,
                    // ValidateIssuerSigningKey = true,
                    // ValidIssuer = Configuration["JwtToken:Issuer"],
                    // ValidAudience = Configuration["JwtToken:Issuer"],
                };
            });
            //.AddMicrosoftAccount(options => {
            //    options.ClientId = Configuration["Authentication:Microsoft:ClientId"];
            //    options.ClientSecret =Configuration["Authentication:Microsoft:ClientSecret"];
            //})
            //.AddGoogle(options => {
            //    IConfigurationSection googleAuthSection = Configuration.GetSection("Authentication:Google");
            //    options.ClientId = googleAuthSection["ClientId"];
            //    options.ClientSecret = googleAuthSection["ClientSecret"];
            //})
            //.AddTwitter(options => {
            //    options.ConsumerKey = Configuration["Authentication:Twitter:ConsumerAPIKey"];
            //    options.ConsumerSecret = Configuration["Authentication:Twitter:ConsumerSecret"];
            //    options.RetrieveUserDetails = true;
            //})
            //.AddFacebook(options => {
            //    options.AppId = Configuration["Authentication:Facebook:AppId"];
            //    options.AppSecret = Configuration["Authentication:Facebook:AppSecret"];
            //});
        }
    }
}