// let journalEntry = []
// const getJournalData = () => {
//     // Fetch from the API
//     return fetch("http://localhost:8088/entries").then(
//         // Parse as JSON    
//         (httpResponse) => {
//             return httpResponse.json()
//         }
//     )
//     .then(
//         (entryArray) => {
//             journalEntry = entryArray
//         }
//     )
// }

API.getJournalEntries()
    .then(() => renderJournalEntries(journalEntry))