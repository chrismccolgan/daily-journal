// This module takes the dom representation components from dom.js and renders them to the dom

import dom from "./dom.js"

const render = {
    entryLog: (array) => {
        document.querySelector(".entryLog").innerHTML = ""
        // This for of loop does the same thing as the .forEach() array method below, leaving it here for my own reference.
        // for (const object of array) {
        //     document.querySelector(".entryLog").innerHTML += dom.journalEntry(object)
        // }
        array.forEach(object => {
            document.querySelector(".entryLog").innerHTML += dom.journalEntry(object)
        })
    },
    input: () => {
        document.querySelector(".journalInput").innerHTML = dom.journalInput()
    },
    search: () => {
        document.querySelector(".journalSearch").innerHTML = dom.journalSearch()
    }
}

export default render