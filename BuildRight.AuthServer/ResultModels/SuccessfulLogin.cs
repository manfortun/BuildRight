using Microsoft.AspNetCore.Identity;

namespace BuildRight.AuthServer.ResultModels;

public class SuccessfulLogin : AuthResult
{
    public SuccessfulLogin(IdentityUser identityUser)
    {
        base.IdentityUser = identityUser;
        base.IsSuccessful = true;
        base.ErrorMessages = [];
    }
}
