namespace BuildRight.ContentManagement.DTOs;

public class ProductRead
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Price { get; set; } = 0;
    public bool IsClickable { get; set; } = true;
    public decimal AverageRating { get; set; } = 0M;
    public IEnumerable<CategoryRead> Categories { get; set; } = default!;
}
