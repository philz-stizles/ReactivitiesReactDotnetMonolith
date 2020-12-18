using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Reactivities.API.Middleware;
using Reactivities.API.SignalR;
using Reactivities.Application.Activities;
using Reactivities.Application.Interfaces;
using Reactivities.Application.Mappings;
using Reactivities.Application.ServiceConfigurations;
using Reactivities.Domain.Models;
using Reactivities.Infrastructure.Email;
using Reactivities.Infrastructure.Photos;
using Reactivities.Infrastructure.Security;
using Reactivities.Infrastructure.User;
using Reactivities.Persistence;

namespace Reactivities.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IJWTGenerator, JWTGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddScoped<IEmailSender, EmailSender>();
            services.AddScoped<IUserProfileReader, UserProfileReader>();

            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.Configure<SendGridSettings>(Configuration.GetSection("SendGridSettings"));

            services.AddMediatR(typeof(List.Handler).Assembly);

            services.AddSignalR();

            services.AddAutoMapper(typeof(MappingProfile).Assembly);

            services.AddCors(options => {
                options.AddPolicy("BasePolicy", policy => {
                    policy
                        .AllowAnyHeader()
                        .AllowAnyOrigin()
                        .AllowAnyMethod();
                });
            });

            // services.AddDocumentationServices("Reactivities API");
            services.AddDbContext<AppDbContext>(options =>
                options.UseMySql(Configuration.GetConnectionString("DefaultConnection")
                // options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")
            ));

            // AddIdentityCore allows us to have control over the Identity configuration - so as to use JWT Tokens 
            // Unlike AddIdentity that would use the default identity configuration which would setup to use cookies
            var builder = services.AddIdentityCore<AppUser>(opt => {      
                opt.Password.RequireDigit = true;
                opt.Password.RequiredLength = 6;
                opt.Password.RequireLowercase = true;
                opt.Password.RequireUppercase = true;
                opt.Password.RequireNonAlphanumeric = true;

                // opt.SignIn.RequireConfirmedEmail = true;
            });
            
            var identityBuilder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
            identityBuilder.AddEntityFrameworkStores<AppDbContext>();
            identityBuilder.AddRoleValidator<RoleValidator<Role>>();
            identityBuilder.AddRoleManager<RoleManager<Role>>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();
            // identityBuilder.AddDefaultTokenProviders();

            services.AddAuthenticationServices(Configuration);

            services.AddAuthorizationServices(Configuration);

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //}

            //app.UseSwagger();

            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Reactivities API");
            //    c.RoutePrefix = string.Empty;
            //});

            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opt => opt.NoReferrer());
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny());
            app.UseCspReportOnly(opt => opt
                .BlockAllMixedContent()
                .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com"))
                .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:"))
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self())
                .ScriptSources(s => s.Self().CustomSources("sha256-wpwFfd8opdMc1lalYpVtkCkaR8Y0HGMG8ors9WyDPKI="))
            );
            // app.UseHttpsRedirection();

            app.UseDefaultFiles(); // This would look in any wwwroot folder for files named "index.html", 
            // "default.html" or typical files that a normal web server would look for to serve by default
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors("BasePolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            // app.UseCors("BasePolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chathub");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
