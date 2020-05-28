import React from "react"
import ReactDOM from "react-dom"

import { Lab } from "lab/lab.component.js"

sessionStorage.clear()
ReactDOM.render(<Lab />, document.querySelector("#app"))
