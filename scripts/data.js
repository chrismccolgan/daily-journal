let journalEntry = []

const API = {
    getJournalEntries () {
        return fetch("http://localhost:8088/entries")
            .then(response => response.json())
            .then ((entryArray) => journalEntry = entryArray) 
    }
}