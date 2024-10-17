namespace BuildRight.AuthServer.DTOs;

public class PasswordNomination
{
    public required string Password { get; init; } = string.Empty;
    public required string ConfirmPassword { get; init; } = string.Empty;

    /// <summary>
    /// Checks if the password and confirm password are equal and not empty
    /// </summary>
    /// <returns>True if not empty and equal. Otherwise, false.</returns>
    public bool IsMatched()
    {
        return Password == ConfirmPassword;
    }
}
