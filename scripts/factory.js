// This module contains a factory function to create a new journal entry object

const createEntryObject = (date, concepts, entry, moodId) => {
    return {
        date: date,
        concepts: concepts,
        moodId: moodId,
        entry: entry
    }
}

export default createEntryObject