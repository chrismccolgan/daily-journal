const makeJournalEntryComponent = {
  journalHTMLRepresentation (journalEntry) {
      return `<div class="journal__container">
            <ul>
                <li>Date: ${journalEntry.date}</li>
                <li>Concepts: ${journalEntry.concepts}</li>
                <li>Mood: ${journalEntry.mood}</li>
                <li>${journalEntry.entry}</li>
            </ul>
        </div>`
  }
}

export default makeJournalEntryComponent