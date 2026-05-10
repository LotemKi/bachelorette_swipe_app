using Microsoft.AspNetCore.Mvc;
using backend_dotnet.Data;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace backend_dotnet.Controllers;

[ApiController]
[Route("profiles")]
public class ProfilesController : ControllerBase
{
    private readonly MongoContext _context;

    public ProfilesController(MongoContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetProfiles()
    {
        var profiles = await _context.Profiles.Find(_ => true).ToListAsync();
        return Ok(profiles);
    }
}