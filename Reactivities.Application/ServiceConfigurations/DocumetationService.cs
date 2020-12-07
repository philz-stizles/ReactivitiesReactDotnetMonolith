using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Reactivities.Application.ServiceConfigurations
{
    public static class DocumetationService
    {
        public static void AddDocumentationServices(this IServiceCollection services, string swaggerTitle)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = $"{swaggerTitle}", Version = "v1" });
                // c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                // {
                //     Description = "Standard Authorization header using the Bearer scheme. Example: \"bearer {token}\"",
                //     In = ParameterLocation.Header,
                //     Name = "Authorization",
                //     Type = SecuritySchemeType.ApiKey
                // });
                // c.AddSecurityRequirement(new OpenApiSecurityRequirement
                //     {
                //         {
                //             new OpenApiSecurityScheme
                //             {
                //                 Reference = new OpenApiReference
                //                 {
                //                     Type = ReferenceType.SecurityScheme,
                //                     Id = "Bearer"
                //                 }
                //             },
                //             Array.Empty<string>()
                //         }
                //     });
                c.CustomSchemaIds(x => x.FullName);
            });
        }
    }
}