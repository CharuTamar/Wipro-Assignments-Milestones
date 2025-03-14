using StockPriceAPI.Hubs;
using StockPriceAPI.Services;
using StockHub = StockPriceAPI.Hubs.StockHub;
using Scalar.AspNetCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSignalR();
builder.Services.AddSingleton<StockService>();    //registering stock service

var app = builder.Build();


app.UseWebSockets();


app.UseCors("AllowAll");    //enabling cors
app.MapHub<StockHub>("/stockhub");   //defining signalR hub route

// Configure the HTTP request pipeline.
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




// app.UseHttpsRedirection();


// start stock price updates
var stockService = app.Services.GetRequiredService<StockService>();
stockService.StartUpdatingStockPrices(); //starting stock service


app.Run();


