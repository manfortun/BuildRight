using BuildRight.AuthServer.ResultModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;

namespace BuildRight.AuthServer.Services;

/// <summary>
/// Login services
/// </summary>
public class LoginService
{
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly UserManager<IdentityUser> _userManager;

    public LoginService(
        SignInManager<IdentityUser> signInManager,
        UserManager<IdentityUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    /// <summary>
    /// Asynchronous login
    /// </summary>
    /// <param name="request">Login request</param>
    /// <returns><see cref="AuthResult"/></returns>
    /// <exception cref="InvalidDataException"></exception>
    public async Task<AuthResult> LoginAsync(LoginRequest request)
    {
        var identityUser = await _userManager.FindByEmailAsync(request.Email);

        // check if the email exists
        if (identityUser is null)
        {
            return new InvalidLogin("Incorrect email address or password.");
        }

        SignInResult signInResult = await _signInManager.PasswordSignInAsync(
            identityUser.UserName ?? throw new InvalidDataException("Username cannot be null."),
            request.Password,
            isPersistent: false,
#if DEBUG
            lockoutOnFailure: false
#else
            lockoutOnFailure: true
#endif
            );

        return signInResult.Succeeded ?
            new InvalidLogin("Incorrect email address or password.") :
            new SuccessfulLogin(identityUser);
    }
}
