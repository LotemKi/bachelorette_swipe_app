using backend_dotnet.Data;
using backend_dotnet.Hubs;
using backend_dotnet.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;

var builder = WebApplication.CreateBuilder(args);
var allowedOrigin = builder.Configuration["AllowedOrigin"];

builder.Services.AddControllers();
builder.Services.AddSingleton<MongoContext>();
builder.Services.AddSingleton<SwipeService>();
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
                "https://bachelorette-swipe-app.vercel.app"
        )
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("FrontendPolicy");
app.MapControllers();
app.MapHub<GameHub>("/gamehub");

var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
app.Urls.Add($"http://*:{port}");

app.Run();