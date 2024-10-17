namespace BuildRight.AuthServer.ResultModels;

public class InvalidLogin : AuthResult
{
    public InvalidLogin(params string[] errorMessages)
    {
        base.IdentityUser = default!;
        base.IsSuccessful = false;

        if (errorMessages.Length > 0)
        {
            base.ErrorMessages = errorMessages;
        }
        else
        {
            base.ErrorMessages = ["Invalid login attempt."];
        }
    }
}
