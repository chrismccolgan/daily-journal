using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using DailyJournal.Models;
using DailyJournal.Utils;

namespace DailyJournal.Repositories
{
    public class EntryRepository : BaseRepository, IEntryRepository
    {
        public EntryRepository(IConfiguration configuration) : base(configuration) { }

        private static string EntryQuery
        {
            get
            {
                return @"SELECT e.Id, 
                                e.Title, 
                                e.Date, 
                                e.JournalEntry, 
                                e.MoodId, 
                                m.MoodName, 
                                m.Emoji
                           FROM Entry e
                      LEFT JOIN Mood m on e.MoodId = m.Id
                          WHERE e.IsDeleted = 0";
            }
        }
        private static string SortByDate
        {
            get
            {
                return "ORDER BY e.Date DESC";
            }
        }

        private static Entry NewEntry(SqlDataReader reader)
        {
            return new Entry()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Date = DbUtils.GetDateTime(reader, "Date"),
                JournalEntry = DbUtils.GetString(reader, "JournalEntry"),
                MoodId = DbUtils.GetInt(reader, "MoodId"),
                Mood = new Mood()
                {
                    Id = DbUtils.GetInt(reader, "MoodId"),
                    MoodName = DbUtils.GetString(reader, "MoodName"),
                    Emoji = DbUtils.GetString(reader, "Emoji")
                }
            };
        }

        public List<Entry> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $"{EntryQuery} {SortByDate}";
                    var entries = new List<Entry>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        entries.Add(NewEntry(reader));
                    }
                    reader.Close();
                    return entries;
                }
            }
        }

        public Entry GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $"{EntryQuery} AND e.Id = @Id {SortByDate}";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();
                    Entry entry = null;
                    if (reader.Read())
                    {
                        entry = NewEntry(reader);
                    }
                    reader.Close();
                    return entry;
                }
            }
        }

        public void Add(Entry entry)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Entry (Title, Date, JournalEntry, MoodId, IsDeleted)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @Date, @JournalEntry, @MoodId, @IsDeleted)";
                    DbUtils.AddParameter(cmd, "@Title", entry.Title);
                    DbUtils.AddParameter(cmd, "@Date", entry.Date);
                    DbUtils.AddParameter(cmd, "@JournalEntry", entry.JournalEntry);
                    DbUtils.AddParameter(cmd, "@MoodId", entry.MoodId);
                    DbUtils.AddParameter(cmd, "@IsDeleted", entry.IsDeleted);
                    entry.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Entry entry)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Entry
                                           SET Title = @Title,
                                               Date = @Date,
                                               JournalEntry = @JournalEntry,
                                               MoodId = @MoodId, 
                                               IsDeleted = @IsDeleted
                                         WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Title", entry.Title);
                    DbUtils.AddParameter(cmd, "@Date", entry.Date);
                    DbUtils.AddParameter(cmd, "@JournalEntry", entry.JournalEntry);
                    DbUtils.AddParameter(cmd, "@MoodId", entry.MoodId);
                    DbUtils.AddParameter(cmd, "@IsDeleted", entry.IsDeleted);
                    DbUtils.AddParameter(cmd, "@Id", entry.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Entry 
                                           SET IsDeleted = 1 
                                         WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Entry> Search(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $"{EntryQuery} AND (e.Title LIKE @criterion OR e.JournalEntry LIKE @criterion) {SortByDate}";
                    DbUtils.AddParameter(cmd, "@criterion", $"%{criterion}%");
                    var reader = cmd.ExecuteReader();
                    List<Entry> entries = new List<Entry>();
                    while (reader.Read())
                    {
                        entries.Add(NewEntry(reader));
                    }
                    reader.Close();
                    return entries;
                }
            }
        }

    }
}
