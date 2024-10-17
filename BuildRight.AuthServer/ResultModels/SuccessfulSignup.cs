using Microsoft.AspNetCore.Identity;

namespace BuildRight.AuthServer.ResultModels;

public class SuccessfulSignup : AuthResult
{
    public SuccessfulSignup(IdentityUser identityUser)
    {
        base.IdentityUser = identityUser;
        base.IsSuccessful = true;
        base.ErrorMessages = [];
    }
}
