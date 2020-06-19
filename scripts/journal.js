import API from "./data.js"
import renderJournalEntries from "./entryList.js"
import createEntryObject from "./createEntry.js"

const showEntries = () => {
    document.querySelector(".entryLog").innerHTML = ""
    API.getJournalEntries()
        .then(renderJournalEntries)
}

// This makes the save button work
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

// This makes the delete button work
document.querySelector(".entryLog").addEventListener("click", event => {
    if (event.target.id.startsWith("deleteJournalEntry--")) {
        const entryToDelete = event.target.id.split("--")[1]
        API.deleteJournalEntry(entryToDelete)
            .then(showEntries)
    }
})

showEntries()