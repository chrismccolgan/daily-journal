// Misc useful functions

import API from "./data.js"
import render from "./list.js"

const formFields = {
    update: (journalObj) => {
        document.querySelector("#entryId").value = journalObj.id
        document.querySelector("#journalDate").value = journalObj.date
        document.querySelector("#journalConcepts").value = journalObj.concepts
        document.querySelector("#journalMood").value = journalObj.moodId
        document.querySelector("#journalEntry").value = journalObj.entry
    },
    clear: () => {
        document.querySelector("#entryId").value = ""
        document.querySelector("#journalDate").value = ""
        document.querySelector("#journalConcepts").value = ""
        document.querySelector("#journalMood").value = ""
        document.querySelector("#journalEntry").value = ""
    }
}

const showEntries = () => {
    API.getJournalEntries()
        .then(allEntries => render.entryLog(allEntries))
    formFields.clear()
}

export { formFields, showEntries }