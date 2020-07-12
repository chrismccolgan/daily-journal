// This makes the search work

const search = (searchTerm, entries) => {
    const filteredEntries = entries.filter(entry => {
        for (const value of Object.values(entry)) {
            if (value.toString().includes(searchTerm)) {
                return entry
            }
        }
    })
    return filteredEntries
}

export default search