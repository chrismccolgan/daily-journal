import API from "./data.js"
import renderJournalEntries from "./entryList.js"

API.getJournalEntries()
    .then(renderJournalEntries.renderEntries)