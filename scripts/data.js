const url = "http://localhost:8088"

const API = {
    getJournalEntries: () => {
        return fetch(`${url}/entries?_expand=mood`)
            .then(response => response.json())
            // This arranges the entries by date in descending order
            .then(array => array.sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            }))
    },
    getSingleEntry: (id) => {
        return fetch(`${url}/entries/${id}`)
            .then(response => response.json())
    },
    saveJournalEntry: (newEntryObject) => {
        return fetch(`${url}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEntryObject)
        })
    },
    deleteJournalEntry: (id) => {
        return fetch(`${url}/entries/${id}`, {
            method: "DELETE",
        })
    },
    editJournalEntry: (id, editEntryObject) => {
        return fetch(`${url}/entries/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editEntryObject)
        })
    }
}

export default API
