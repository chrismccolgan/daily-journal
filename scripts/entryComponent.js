const makeJournalEntryComponent = (journalEntry) => {
    // Create your own HTML structure for a journal entry
    const journalHTMLRepresentation = 
        `<div class="journal__container">
            <ul>
                <li>Date: ${journalEntry.date}</li>
                <li>Concepts: ${journalEntry.concepts}</li>
                <li>Mood: ${journalEntry.mood}</li>
                <li>${journalEntry.entry}</li>
            </ul>
        </div>`

    return journalHTMLRepresentation
}