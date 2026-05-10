using MongoDB.Driver;
using backend_dotnet.Models;
using Microsoft.Extensions.Configuration;

namespace backend_dotnet.Data;

public class MongoContext
{
    public IMongoCollection<User> Users { get; }
    public IMongoCollection<Profile> Profiles { get; }
    public IMongoCollection<Swipe> Swipes { get; }

    public MongoContext(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDb:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDb:Database"]);

        Users = database.GetCollection<User>("Users");
        Profiles = database.GetCollection<Profile>("Profiles");
        Swipes = database.GetCollection<Swipe>("Swipes");
    }
}