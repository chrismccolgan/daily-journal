const url = "http://localhost:8088"

const API = {
    getJournalEntries: () => {
        return fetch(`${url}/entries`)
            .then(response => response.json())
    },
    saveJournalEntry: (newEntryObject) => {
        return fetch(`${url}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEntryObject)
        }).then(response => response.json())
    },
    deleteJournalEntry: (id) => {
        return fetch(`${url}/entries/${id}`, {
            method: "DELETE",
        }).then(response => response.json())
    }
}

export default API