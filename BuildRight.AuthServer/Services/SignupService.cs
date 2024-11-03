using BuildRight.AuthServer.DataAccess;
using BuildRight.AuthServer.DTOs;
//using BuildRight.AuthServer.Models;
using BuildRight.AuthServer.ResultModels;
using Microsoft.AspNetCore.Identity;

namespace BuildRight.AuthServer.Services;

/// <summary>
/// Sign up services
/// </summary>
public class SignupService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly UserManager<IdentityUser> _userManager;

    public SignupService(
        AppDbContext context,
        UserManager<IdentityUser> userManager)
    {
        _unitOfWork = new UnitOfWork(context);
        _userManager = userManager;
    }

    /// <summary>
    /// Asynchronous sign up
    /// </summary>
    /// <param name="request"><see cref="SignUpRequest"/></param>
    /// <returns><see cref="AuthResult"/></returns>
    public async Task<AuthResult> SignUpAsync(SignUpRequest request)
    {
        if (!request.Password.IsMatched())
        {
            return new InvalidSignup("Passwords do not match.");
        }

        var identityUser = new IdentityUser { UserName = request.Username, Email = request.Email };
        IdentityResult identityResult = await _userManager.CreateAsync(identityUser);

        if (!identityResult.Succeeded)
        {
            string[] errors = identityResult.Errors.Select(e => e.Description).ToArray();
            return new InvalidSignup(errors);
        }

        return new SuccessfulSignup(identityUser);
    }

    /// <summary>
    /// Creates and stores the user information into the context
    /// </summary>
    /// <param name="identityUser"><see cref="IdentityUser"/></param>
    /// <param name="request"><see cref="UserInformation"/></param>
    /// <returns><see cref="AuthResult"/></returns>
    private AuthResult CreateUserInformation(IdentityUser identityUser, UserInformation request)
    {
        try
        {
            //User user = new User
            //{
            //    FirstName = request.FirstName,
            //    LastName = request.LastName,
            //    IdentityId = identityUser.Id,
            //};

            //_unitOfWork.Users.Insert(user);
            //_unitOfWork.Save();

            return new SuccessfulSignup(identityUser);
        }
        catch (Exception ex)
        {
            return new InvalidSignup(ex.Message);
        }
    }
}
