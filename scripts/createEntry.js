const createEntryObject = (date, concepts, entry, mood) => {
    return {
        date: date,
        concepts: concepts,
        mood: mood,
        entry: entry
    }
}

export default createEntryObject