using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using DailyJournal.Models;
using DailyJournal.Utils;

namespace DailyJournal.Repositories
{
    public class MoodRepository : BaseRepository, IMoodRepository
    {
        public MoodRepository(IConfiguration configuration) : base(configuration) { }

        private static string MoodQuery
        {
            get
            {
                return @"SELECT Id, 
                                MoodName, 
                                Emoji
                           FROM Mood
                       ORDER BY MoodName";
            }
        }

        private static Mood NewMood(SqlDataReader reader)
        {
            return new Mood()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                MoodName = DbUtils.GetString(reader, "MoodName"),
                Emoji = DbUtils.GetString(reader, "Emoji")
            };
        }

        public List<Mood> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = MoodQuery;
                    var moods = new List<Mood>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        moods.Add(NewMood(reader));
                    }
                    reader.Close();
                    return moods;
                }
            }
        }
    }
}
