using Microsoft.AspNetCore.Mvc;
using DailyJournal.Repositories;

namespace DailyJournal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntryController : ControllerBase
    {
        private readonly IEntryRepository _entryRepository;
        public EntryController(IEntryRepository entryRepository)
        {
            _entryRepository = entryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_entryRepository.GetAll());
        }

    }
}
