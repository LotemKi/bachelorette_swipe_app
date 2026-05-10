using System;
using System.Threading.Tasks;
using backend_dotnet.Models;
using backend_dotnet.Services;
using Microsoft.AspNetCore.SignalR;

namespace backend_dotnet.Hubs;

public class GameHub : Hub
{
    private readonly SwipeService _swipeService;

    public GameHub(SwipeService swipeService)
    {
        _swipeService = swipeService;
    }

    public async Task JoinRoom(string roomCode)
    {
        if (string.IsNullOrWhiteSpace(roomCode))
        {
            await Task.CompletedTask;
            return;
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);
        var leaderboard = await _swipeService.GetLeaderboardAsync(roomCode);
        await Clients.Caller.SendAsync("leaderboardUpdate", leaderboard);
    }

    public async Task Swipe(SwipeMessage message)
    {
        if (message is null || string.IsNullOrWhiteSpace(message.RoomCode) || string.IsNullOrWhiteSpace(message.Nickname) || string.IsNullOrWhiteSpace(message.ProfileId))
        {
            await Task.CompletedTask;
            return;
        }

        var swipe = new Swipe
        {
            Nickname = message.Nickname.Trim(),
            RoomCode = message.RoomCode.Trim().ToUpperInvariant(),
            ProfileId = message.ProfileId.Trim(),
            Liked = message.Liked,
            Timestamp = DateTime.UtcNow,
        };

        var inserted = await _swipeService.AddSwipeAsync(swipe);
        if (!inserted)
        {
            return;
        }

        var leaderboard = await _swipeService.GetLeaderboardAsync(swipe.RoomCode);
        await Clients.Group(swipe.RoomCode).SendAsync("leaderboardUpdate", leaderboard);
    }

    public class SwipeMessage
    {
        public string Nickname { get; set; }
        public string RoomCode { get; set; }
        public string ProfileId { get; set; }
        public bool Liked { get; set; }
    }
}