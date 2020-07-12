// This module makes all the buttons I have on my journal work

import API from "./data.js"
import render from "./list.js"
import createEntryObject from "./factory.js"
import { formFields, showEntries } from "./modules.js"
import search from "./search.js"

const buttons = {
    save: () => {
        document.querySelector("#saveButton").addEventListener("click", clickEvent => {
            const idVal = document.querySelector("#entryId").value
            const dateVal = document.querySelector("#journalDate").value
            const conceptVal = document.querySelector("#journalConcepts").value
            const entryVal = document.querySelector("#journalEntry").value
            const moodVal = document.querySelector("#journalMood").value
            const newJournalObject = createEntryObject(dateVal, conceptVal, entryVal, moodVal)

            if (dateVal === "" || conceptVal === "" || entryVal === "" || moodVal === "") {
                alert("Please complete all fields")
            } else if (idVal !== "") {
                API.editJournalEntry(idVal, newJournalObject)
                    .then(showEntries)
            } else {
                API.saveJournalEntry(newJournalObject)
                    .then(showEntries)
            }
        })
    },
    deleteEdit: () => {
        document.querySelector(".entryLog").addEventListener("click", event => {
            if (event.target.id.startsWith("deleteJournalEntry--")) {
                const entryToDelete = event.target.id.split("--")[1]
                API.deleteJournalEntry(entryToDelete)
                    .then(showEntries)
            } else if (event.target.id.startsWith("editJournalEntry--")) {
                const entryToEdit = event.target.id.split("--")[1]
                API.getSingleEntry(entryToEdit)
                    .then(entryToEdit => formFields.update(entryToEdit))
            }
        })
    },
    search: () => {
        document.querySelector("#searchButton").addEventListener("click", event => {
            API.getJournalEntries()
                .then((allEntries) => search(document.querySelector("#searchBar").value, allEntries))
                .then((filteredEntries) => render.entryLog(filteredEntries))
        })
    }
}

export default buttons