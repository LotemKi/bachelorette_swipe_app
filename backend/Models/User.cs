using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend_dotnet.Models;

public class User
{
    [BsonId]
    public ObjectId Id { get; set; }

    public string Nickname { get; set; }
    public string RoomCode { get; set; }
}