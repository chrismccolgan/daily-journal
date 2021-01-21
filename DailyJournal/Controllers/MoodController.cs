using Microsoft.AspNetCore.Mvc;
using DailyJournal.Repositories;

namespace DailyJournal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoodController : ControllerBase
    {
        private readonly IMoodRepository _moodRepository;
        public MoodController(IMoodRepository moodRepository)
        {
            _moodRepository = moodRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_moodRepository.GetAll());
        }
    }
}
