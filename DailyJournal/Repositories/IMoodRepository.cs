using DailyJournal.Models;
using System.Collections.Generic;

namespace DailyJournal.Repositories
{
    public interface IMoodRepository
    {
        List<Mood> GetAll();
    }
}