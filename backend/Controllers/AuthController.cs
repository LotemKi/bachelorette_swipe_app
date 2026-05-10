using Microsoft.AspNetCore.Mvc;
using backend_dotnet.Data;
using backend_dotnet.Models;
using System.Threading.Tasks;

namespace backend_dotnet.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly MongoContext _context;

    public AuthController(MongoContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(User user)
    {
        await _context.Users.InsertOneAsync(user);
        return Ok(user);
    }
}