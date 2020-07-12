// This module contains the string representations for all the content to be rendered on the dom

const dom = {
    journalEntry: (entry) => {
        const stringJournalEntry =
            `<div class="journal__container">
                <ul>
                    <li>Date: ${entry.date}</li>
                    <li>Concepts: ${entry.concepts}</li>
                    <li>Mood: ${entry.mood.label}</li>
                    <li>${entry.entry}</li>
                </ul>
                <div class="button__container">
                    <button class="button__container--edit" id="editJournalEntry--${entry.id}" type="button">Edit</button>
                    <button class="button__container--delete" id="deleteJournalEntry--${entry.id}" type="button">Delete</button>
                </div>
            </div>`
        return stringJournalEntry
    },
    journalInput: () => {
        const stringJournalInput =
            `<form action="">
                <fieldset>
                    <input type="hidden" id="entryId" value="">
                    <legend>Create journal entry:</legend>
            
                    <label for="journalDate"></label>
                    <input type="date" name="journalDate" id="journalDate">
                    <br>
                    
                    <label for="journalConcepts"></label>
                    <input type="text" name="journalConcepts" id="journalConcepts" placeholder="Concepts covered">
                    <br>
                    
                    <label for="journalMood"></label>
                    <select name="journalMood" id="journalMood">
                        <option value="" selected disabled>Mood</option>
                        <option value="1">😀 Happy</option>
                        <option value="2">😢 Sad</option>
                        <option value="3">🤬 Frustrated</option>
                        <option value="4">💪 Accomplished</option>
                        <option value="5">😁 Excited</option>
                        <option value="6">💀 Burned out</option>
                    </select>
                    <br>
                    
                    <label for="journalEntry"></label>
                    <textarea name="journalEntry" id="journalEntry" placeholder="Journal entry"></textarea>
                    <br>
            
                    <button type="button" id="saveButton">Submit</button>
                </fieldset>
            </form>`
        return stringJournalInput
    },
    journalSearch: () => {
        const stringJournalSearch =
            `<fieldset>
                <legend>Search journal entries:</legend>
                <label for="searchBar"></label>
                <input type="text" name="searchBar" id="searchBar" placeholder="Enter search term">
                <button type="button" id="searchButton">Search</button>                
            </fieldset>`
        return stringJournalSearch
    }
}

export default dom