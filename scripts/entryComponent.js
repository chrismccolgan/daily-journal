const makeJournalEntryComponent = (journalEntry) => {
    const string =
        `<div class="journal__container">
            <ul>
                <li>Date: ${journalEntry.date}</li>
                <li>Concepts: ${journalEntry.concepts}</li>
                <li>Mood: ${journalEntry.mood}</li>
                <li>${journalEntry.entry}</li>
            </ul>
            <div class="button__container">
                <button class="button__container--edit" id="editJournalEntry--${journalEntry.id}" type="button">Edit</button>
                <button class="button__container--delete" id="deleteJournalEntry--${journalEntry.id}" type="button">Delete</button>
            </div>
        </div>`
    return string
}

export default makeJournalEntryComponent