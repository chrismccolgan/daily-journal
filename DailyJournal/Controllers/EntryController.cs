using Microsoft.AspNetCore.Mvc;
using DailyJournal.Repositories;
using DailyJournal.Models;

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

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var entry = _entryRepository.GetById(id);
            if (entry == null)
            {
                return NotFound();
            }
            return Ok(entry);
        }

        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            return Ok(_entryRepository.Search(q));
        }

        [HttpPost]
        public IActionResult Post(Entry entry)
        {
            _entryRepository.Add(entry);
            return CreatedAtAction("Get", new { id = entry.Id }, entry);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Entry entry)
        {
            if (id != entry.Id)
            {
                return BadRequest();
            }
            _entryRepository.Update(entry);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _entryRepository.Delete(id);
            return NoContent();
        }
    }
}
