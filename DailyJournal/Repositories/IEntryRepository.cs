using DailyJournal.Models;
using System.Collections.Generic;

namespace DailyJournal.Repositories
{
    public interface IEntryRepository
    {
        void Add(Entry entry);
        void Delete(int id);
        List<Entry> GetAll();
        Entry GetById(int id);
        List<Entry> Search(string criterion);
        void Update(Entry entry);
    }
}