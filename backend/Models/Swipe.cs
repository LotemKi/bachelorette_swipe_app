using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend_dotnet.Models;

public class Swipe
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("nickname")]
    public string Nickname { get; set; }

    [BsonElement("roomCode")]
    public string RoomCode { get; set; }

    [BsonElement("profileId")]
    public string ProfileId { get; set; }

    [BsonElement("liked")]
    public bool Liked { get; set; }

    [BsonElement("timestamp")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}