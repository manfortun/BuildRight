using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BuildRight.AuthServer.Services;

public class TokenService
{
    private readonly string _secretKey;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly SignInManager<IdentityUser> _signInManager;

    public TokenService(IConfiguration config, SignInManager<IdentityUser> signInManager)
    {
        _secretKey = config["Jwt:SecretKey"] ?? throw new NotImplementedException("No secret key defined in application settings.");
        _issuer = config["Jwt:Issuer"] ?? throw new NotImplementedException("No issuer defined in application settings.");
        _audience = config["Jwt:Audience"] ?? throw new NotImplementedException("No audience defined in application settings.");
        _signInManager = signInManager;
    }

    public async Task<string> GenerateJwtToken(IdentityUser identityUser)
    {
        ClaimsPrincipal principal = await _signInManager.CreateUserPrincipalAsync(identityUser);

        return this.GenerateJwtToken(principal.Claims);
    }

    public string GenerateJwtToken(IEnumerable<Claim> claims)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        return this.GenerateJwtToken(claims, credentials);
    }

    public string GenerateJwtToken(IEnumerable<Claim> claims, SigningCredentials signingCredentials)
    {
        ArgumentNullException.ThrowIfNull(signingCredentials);

        var token = new JwtSecurityToken(_issuer, _audience, claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
