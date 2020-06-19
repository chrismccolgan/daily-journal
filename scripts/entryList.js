import makeJournalEntryComponent from "./entryComponent.js"

const renderJournalEntries = (entries) => {
    for (const entry of entries) {
        document.querySelector(".entryLog").innerHTML += makeJournalEntryComponent(entry)
    }
}

export default renderJournalEntries