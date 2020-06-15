import makeJournalEntryComponent from "./entryComponent.js"

const renderJournalEntries = {
    renderEntries (entries) {
        let entry = []
        for (entry of entries) {
            const journalHTML = makeJournalEntryComponent.journalHTMLRepresentation(entry)
            const journalArticleElement = document.querySelector(".entryLog")
            journalArticleElement.innerHTML += journalHTML
        }
    }
}

export default renderJournalEntries