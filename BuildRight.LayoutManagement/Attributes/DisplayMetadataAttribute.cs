namespace BuildRight.LayoutManagement.Attributes;

[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
public class DisplayMetadataAttribute : Attribute
{
    private string? placeholder;
    public string DisplayName { get; }
    public string Placeholder
    {
        get => placeholder ?? DisplayName;
        set => placeholder = value;
    }
    public string InputType { get; set; }
    public bool CanWrite { get; set; } = true;
    public DisplayMetadataAttribute(string displayName)
    {
        DisplayName = displayName;
    }
}
