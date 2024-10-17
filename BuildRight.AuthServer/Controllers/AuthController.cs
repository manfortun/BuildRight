using BuildRight.AuthServer.DTOs;
using BuildRight.AuthServer.ResultModels;
using BuildRight.AuthServer.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace BuildRight.AuthServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly TokenService _tokenService;
    private readonly SignupService _signupService;
    private readonly LoginService _loginService;

    public AuthController(TokenService tokenService, SignupService signupService, LoginService loginService)
    {
        _tokenService = tokenService;
        _signupService = signupService;
        _loginService = loginService;
    }

    [HttpPost(nameof(SignUp))]
    public async Task<IActionResult> SignUp([FromBody] SignUpRequest request)
    {
        AuthResult result = await _signupService.SignUpAsync(request);

        if (!result.IsSuccessful)
        {
            return BadRequest(new { errors = result.ErrorMessages });
        }

        string token = await _tokenService.GenerateJwtToken(result.IdentityUser);

        return Ok(new { token });
    }

    [HttpPost(nameof(Login))]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        AuthResult result = await _loginService.LoginAsync(request);

        if (!result.IsSuccessful)
        {
            return Unauthorized(new { errors = result.ErrorMessages });
        }

        string token = await _tokenService.GenerateJwtToken(result.IdentityUser);

        return Ok(new { token });
    }
}
