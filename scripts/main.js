import { showEntries } from "./modules.js"
import buttons from "./eventListeners.js"
import render from "./list.js"

render.input()
render.search()

buttons.save()
buttons.deleteEdit()
buttons.search()

showEntries()