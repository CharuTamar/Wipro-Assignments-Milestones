var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(); // Add this line to register controllers

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:5173") // React frontend URL
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowReactApp"); // Apply CORS policy
app.MapControllers(); // Ensure controllers are mapped

app.Run();
