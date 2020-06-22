import API from "./data.js"
import renderJournalEntries from "./entryList.js"
import createEntryObject from "./createEntry.js"

const updateFormFields = (journalObj) => {
    const hiddenEntryID = document.querySelector("#entryID");
    const journalDateInput = document.querySelector("#journalDate");
    const journalConceptsInput = document.querySelector("#journalConcepts");
    const journalMoodInput = document.querySelector("#journalMood");
    const journalEntryInput = document.querySelector("#journalEntry");

    hiddenEntryID.value = journalObj.id;
    journalDateInput.value = journalObj.date
    journalConceptsInput.value = journalObj.concepts;
    journalMoodInput.value = journalObj.mood;
    journalEntryInput.value = journalObj.entry;
}

const showEntries = () => {
    document.querySelector(".entryLog").innerHTML = ""
    API.getJournalEntries()
        .then(renderJournalEntries)
}

// This makes the save button work
document.querySelector("#saveButton").addEventListener("click", clickEvent => {
    const IDVal = document.querySelector("#entryID").value
    const dateVal = document.querySelector("#journalDate").value
    const conceptVal = document.querySelector("#journalConcepts").value
    const entryVal = document.querySelector("#journalEntry").value
    const moodVal = document.querySelector("#journalMood").value
    const newJournalObject = createEntryObject(dateVal, conceptVal, entryVal, moodVal)

    if (dateVal === "" || conceptVal === "" || entryVal === "" || moodVal === "") {
        alert("Please complete all fields")
    } else if (IDVal !== "") {
        API.editJournalEntry(IDVal, newJournalObject)
            .then(showEntries)
    } else {
        API.saveJournalEntry(newJournalObject)
            .then(showEntries)
    }
})

// This makes the delete and edit button work
document.querySelector(".entryLog").addEventListener("click", event => {
    if (event.target.id.startsWith("deleteJournalEntry--")) {
        const entryToDelete = event.target.id.split("--")[1]
        API.deleteJournalEntry(entryToDelete)
            .then(showEntries)
    } else if (event.target.id.startsWith("editJournalEntry--")) {
        const entryToEdit = event.target.id.split("--")[1]
        API.getSingleEntry(entryToEdit)
            .then(entryToEdit => updateFormFields(entryToEdit))
    }
})

showEntries()