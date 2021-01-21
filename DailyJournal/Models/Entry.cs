using System;
using System.ComponentModel.DataAnnotations;

namespace DailyJournal.Models
{
    public class Entry
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string JournalEntry { get; set; }

        public bool IsDeleted { get; set; }

        [Required]
        public int MoodId { get; set; }

        public Mood Mood { get; set; }
    }
}
