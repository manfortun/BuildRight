﻿namespace BuildRight.LayoutManagement.RequestDTOs;

public class LayoutAddRequest
{
    public dynamic Properties { get; init; } = default!;
    public string? ParentId { get; init; } = default!;
}
