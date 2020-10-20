using System.Security.Claims;
using Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace CAInvoiceManagementApp.Infrastructure.API.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        public string UserId { get; }

        // We need the HTTP context Accessor here to get our claims and find our user. We also register this service in our startup file.
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            UserId = httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}