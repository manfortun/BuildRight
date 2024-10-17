using Microsoft.AspNetCore.Identity;

namespace BuildRight.AuthServer.ResultModels;

public class AuthResult
{
    public IdentityUser IdentityUser { get; protected set; } = default!;
    public string[] ErrorMessages { get; protected set; } = [];
    public bool IsSuccessful { get; protected set; } = false;
}
