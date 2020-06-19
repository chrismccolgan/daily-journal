import API from "./data.js"
import showEntries from "./journal.js"
import createEntryObject from "./createEntry.js"

const enableSaveButton = () => {
    document.querySelector("#saveButton").addEventListener("click", clickEvent => {
        const dateVal = document.querySelector("#journalDate").value
        const conceptVal = document.querySelector("#journalConcepts").value
        const entryVal = document.querySelector("#journalEntry").value
        const moodVal = document.querySelector("#journalMood").value

        if (dateVal === "" || conceptVal === "" || entryVal === "" || moodVal === "") {
            alert("Please complete all fields")
        } else {
            const newJournalObject = createEntryObject(dateVal, conceptVal, entryVal, moodVal)
            API.saveJournalEntry(newJournalObject)
                .then(showEntries)
        }
    })
}

export default enableSaveButton