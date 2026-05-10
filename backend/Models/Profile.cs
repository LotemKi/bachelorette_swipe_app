using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend_dotnet.Models;

public class Profile
{
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonId]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("age")]
    public int Age { get; set; }

    [BsonElement("bio")]
    public string Bio { get; set; }

    [BsonElement("images")]
    public List<string> Images { get; set; }

    [BsonElement("height")]
    public string Height { get; set; }

    [BsonElement("profession")]
    public string Profession { get; set; }

    [BsonElement("about")]
    public string About { get; set; }

    [BsonElement("lookingFor")]
    public string LookingFor { get; set; }

    [BsonElement("redFlags")]
    public List<string> RedFlags { get; set; }

    [BsonElement("greenFlags")]
    public List<string> GreenFlags { get; set; }

    [BsonElement("pickupLine")]
    public string PickupLine { get; set; }

    [BsonElement("extra")]
    public string Extra { get; set; }

    // ✅ NEW
    [BsonElement("habits")]
    public Habits Habits { get; set; }

    [BsonElement("weirdQuestions")]
    public WeirdQuestions WeirdQuestions { get; set; }
}

public class Habits
{
    [BsonElement("smoking")]
    public string Smoking { get; set; }

    [BsonElement("smokingTurnOff")]
    public string SmokingTurnOff { get; set; }

    [BsonElement("alcohol")]
    public string Alcohol { get; set; }

    [BsonElement("pets")]
    public string Pets { get; set; }

    [BsonElement("messy")]
    public string Messy { get; set; }

    [BsonElement("timeType")]
    public string TimeType { get; set; }
}

public class WeirdQuestions
{
    [BsonElement("liveOnBoat")]
    public string LiveOnBoat { get; set; }

    [BsonElement("attractedToIntelligence")]
    public string AttractedToIntelligence { get; set; }
}