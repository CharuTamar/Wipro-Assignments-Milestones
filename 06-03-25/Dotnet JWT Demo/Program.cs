using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ToDoAPI.Data;
using ToDoAPI.Models;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// 🟢 Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 🟢 Add OpenAPI
builder.Services.AddOpenApi();

// 🟢 Configure Entity Framework Core
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseSqlite("Data Source=todos.db"));

// 🟢 Configure Authentication & Authorization
var jwtSettings = builder.Configuration.GetSection("Jwt");
Console.WriteLine($"JWT Key: {jwtSettings["Key"]}");
Console.WriteLine($"Issuer: {jwtSettings["Issuer"]}");
Console.WriteLine($"Audience: {jwtSettings["Audience"]}");

var keyString = jwtSettings["Key"] ?? throw new ArgumentNullException("JWT Key is missing in appsettings.json");
var key = Encoding.UTF8.GetBytes(keyString);


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// 🟢 Apply pending migrations
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ToDoDbContext>();
    dbContext.Database.Migrate();
}

// 🟢 Configure Middleware
app.UseCors("AllowAll");
app.UseAuthentication(); // ✅ Enable authentication
app.UseAuthorization();  // ✅ Enable authorization


// 🟢 Enable Swagger in Development Mode
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options
        .WithTitle("ToDo API")
        .WithTheme(ScalarTheme.BluePlanet)
        .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.Axios);
    });
}

// 🟢 Minimal API Endpoints

// 🔐 Login Endpoint - Generates JWT Token
app.MapPost("/login", (LoginRequest loginRequest) =>
{
    if (loginRequest.Username == "admin" && loginRequest.Password == "password")
    {
        var token = GenerateJwtToken(loginRequest.Username, jwtSettings);
        return Results.Ok(new { Token = token });
    }

    return Results.Unauthorized();
});

// 🛡️ Secure Endpoint Example (Requires Authentication)
app.MapGet("/secure-tasks", async (ToDoDbContext db) =>
    await db.Todos.ToListAsync()).RequireAuthorization();

// CRUD Endpoints (Can be secured later)
app.MapGet("/todos", async (ToDoDbContext db) =>
{
    var todos = await db.Todos.ToListAsync();
    return Results.Ok(todos);
})
.RequireAuthorization(); // ✅ Secure GET all todos


app.MapGet("/todos/{id}", async (int id, ToDoDbContext db) =>
{
    var todo = await db.Todos.FindAsync(id);
    return todo is not null ? Results.Ok(todo) : Results.NotFound();
})
.RequireAuthorization(); // ✅ Secure GET todo by ID



app.MapPost("/todos", async (ToDo todo, ToDoDbContext db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todos/{todo.Id}", todo);
}).RequireAuthorization(); // 🔒 Secure POST endpoint

app.MapPut("/todos/{id}", async (int id, ToDo updatedTodo, ToDoDbContext db) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();

    todo.Title = updatedTodo.Title;
    todo.IsCompleted = updatedTodo.IsCompleted;
    await db.SaveChangesAsync();

    return Results.Ok(todo);
}).RequireAuthorization(); // 🔒 Secure PUT endpoint

app.MapDelete("/todos/{id}", async (int id, ToDoDbContext db) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();

    db.Todos.Remove(todo);
    await db.SaveChangesAsync();
    return Results.Ok(todo);
}).RequireAuthorization(); // 🔒 Secure DELETE endpoint

app.Run();

// 🟢 JWT Token Generation Function
string GenerateJwtToken(string username, IConfigurationSection jwtSettings)
{
    Console.WriteLine("Generating JWT Token...");

    var key = jwtSettings["Key"];
    if (string.IsNullOrEmpty(key))
    {
        Console.WriteLine("JWT Key is missing in configuration!");
        throw new Exception("JWT Key is missing in configuration.");
    }

    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(JwtRegisteredClaimNames.Sub, username),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.Name, username)
    };

    var token = new JwtSecurityToken(
        issuer: jwtSettings["Issuer"],
        audience: jwtSettings["Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(30),
        signingCredentials: credentials
    );

    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

    Console.WriteLine("Generated Token: " + tokenString);  // 🟢 Print Token to Console
    return tokenString;
}


// 🟢 Login Request Model
record LoginRequest(string Username, string Password);
