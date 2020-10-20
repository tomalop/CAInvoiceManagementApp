namespace Application.Common.Interfaces
{
    /// <summary>
    /// Interface to get the current user ID of the logged user.
    /// </summary>
    public interface ICurrentUserService
    {
        string UserId { get;  }
    }
}