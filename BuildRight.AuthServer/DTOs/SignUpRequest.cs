namespace BuildRight.AuthServer.DTOs;

public class SignUpRequest
{
    public required string Email { get; init; } = string.Empty;
    public required string Username { get; init; } = string.Empty;
    public required PasswordNomination Password { get; init; } = default!;
    //public required UserInformation UserInformation { get; init; } = default!;
}
