using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using Reactivities.Domain.Models;

namespace Reactivities.Persistence
{
    public class Seeder
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<Role> roleManager)
        {
            await SeedRoles(roleManager);

            if(!userManager.Users.Any())
            {
                // Create Admin User
                var admin = new AppUser
                {
                    DisplayName = "Administrator",
                    UserName = "Admin",
                    Email = "theophilusighalo@gmail.com"
                };
                
                var result = await userManager.CreateAsync(admin, "P@ssw0rd");
                if(result.Succeeded){
                    var newAdmin = userManager.FindByNameAsync("Admin").Result;
                    await userManager.AddToRolesAsync(newAdmin, new[]{ "Admin", "Moderator"});
                }
            }
        }

        public static async Task SeedFromJson(UserManager<AppUser> userManager, RoleManager<Role> roleManager)
        {
            await SeedRoles(roleManager);
            var json = File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<AppUser>>(json);
            
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "P@ssw0rd");
                await userManager.AddToRoleAsync(user, "Member");
            }
        }

        private static async Task SeedRoles(RoleManager<Role> roleManager)
        {
            var roles = new List<Role>{
                new Role{ Name = "Admin"},
                new Role{ Name = "Member"},
                new Role{ Name = "Moderator"},
                new Role{ Name = "Vip"}
            };

            foreach (var role in roles)
            {
                if(!(await roleManager.RoleExistsAsync(role.Name))){
                    await roleManager.CreateAsync(role);
                }
            }
        }
    }
}