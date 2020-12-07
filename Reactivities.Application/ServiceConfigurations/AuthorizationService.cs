using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Reactivities.Application.ServiceConfigurations
{
    public static class AuthorizationService
    {
        public static void AddAuthorizationServices(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddAuthorization(options => {
                options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
                options.AddPolicy("RequireMemberRole", policy => policy.RequireRole("Member"));
            });
        }
    }
}