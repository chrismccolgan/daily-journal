const renderJournalEntries = () => {
    for (const currentJournalEntry of journalEntry) {
        const journalHTML = makeJournalEntryComponent(currentJournalEntry)
        const journalArticleElement = document.querySelector(".entryLog")
        journalArticleElement.innerHTML += journalHTML
    }
}