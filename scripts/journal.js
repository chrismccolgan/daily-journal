import API from "./data.js"
import renderJournalEntries from "./entryList.js"
import createEntryObject from "./createEntry.js"

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

const showEntries = () => {
    document.querySelector(".entryLog").innerHTML = ""
    API.getJournalEntries()
        .then(renderJournalEntries)
}

showEntries()