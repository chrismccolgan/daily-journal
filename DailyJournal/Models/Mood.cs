using System.ComponentModel.DataAnnotations;

namespace DailyJournal.Models
{
    public class Mood
    {
        public int Id { get; set; }

        [Required]
        public string MoodName { get; set; }

        [Required]
        public string Emoji { get; set; }
    }
}
