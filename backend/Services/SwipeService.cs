using System.Collections.Generic;
using System.Threading.Tasks;
using backend_dotnet.Data;
using backend_dotnet.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace backend_dotnet.Services;

public class SwipeService
{
    private readonly MongoContext _context;

    public SwipeService(MongoContext context)
    {
        _context = context;
    }

    public async Task<bool> AddSwipeAsync(Swipe swipe)
    {
        var duplicateFilter = Builders<Swipe>.Filter.And(
            Builders<Swipe>.Filter.Eq(s => s.Nickname, swipe.Nickname),
            Builders<Swipe>.Filter.Eq(s => s.RoomCode, swipe.RoomCode),
            Builders<Swipe>.Filter.Eq(s => s.ProfileId, swipe.ProfileId)
        );

        if (await _context.Swipes.Find(duplicateFilter).AnyAsync())
        {
            return false;
        }

        await _context.Swipes.InsertOneAsync(swipe);
        return true;
    }

    public async Task<Dictionary<string, int>> GetLeaderboardAsync(string roomCode)
    {
        var filter = Builders<Swipe>.Filter.And(
            Builders<Swipe>.Filter.Eq(s => s.RoomCode, roomCode),
            Builders<Swipe>.Filter.Eq(s => s.Liked, true)
        );

        var leaderboardResults = await _context.Swipes.Aggregate()
            .Match(filter)
            .Group(new BsonDocument
            {
                { "_id", "$profileId" },
                { "count", new BsonDocument("$sum", 1) }
            })
            .ToListAsync();

        var leaderboard = new Dictionary<string, int>();
        foreach (var item in leaderboardResults)
        {
            var profileId = item.GetValue("_id", BsonNull.Value).AsString;
            var count = item.GetValue("count", BsonInt32.Create(0)).AsInt32;
            leaderboard[profileId] = count;
        }

        return leaderboard;
    }
}
