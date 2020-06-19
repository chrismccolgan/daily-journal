const makeJournalEntryComponent = (journalEntry) => {
    const string =
        `<div class="journal__container">
            <ul>
                <li>Date: ${journalEntry.date}</li>
                <li>Concepts: ${journalEntry.concepts}</li>
                <li>Mood: ${journalEntry.mood}</li>
                <li>${journalEntry.entry}</li>
            </ul>
            <button id="deleteJournalEntry--${journalEntry.id} type="button">Delete</button>
        </div>`
    return string
}

export default makeJournalEntryComponent