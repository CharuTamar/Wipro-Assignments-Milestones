using SampleAPI.Services;
using Xunit;

namespace SampleApi.Tests;

public class CalculatorServiceTests
{
    private readonly CalculatorService _calculatorService;

    public CalculatorServiceTests()
    {
        _calculatorService = new CalculatorService();
    }

    [Fact]
    public void Add_ShouldReturnCorrectSum()
    {
        // Arrange
        int a = 5;
        int b = 3;

        // Act
        int result = _calculatorService.Add(a, b);

        // Assert
        Assert.Equal(8, result);
    }

    [Fact]
    public void Subtract_ShouldReturnCorrectDifference()
    {
        // Arrange
        int a = 5;
        int b = 3;

        // Act
        int result = _calculatorService.Subtract(a, b);

        // Assert
        Assert.Equal(2, result);
    }
}
