/* tslint:disable */

import * as React from "react"
import * as ReactDOM from "react-dom"
import Intro from "./components/Intro"


// declare global {
//   interface Window {
//     require: any
//   }
// }

// const { ipcRenderer } = require("electron")
import {ipcRenderer} from "electron"

// Import the styles here to process them with webpack
import "@public/style.css"

const  App = () => (
  <div className="App">
    <Intro/>
  </div>
);

// tslint:disable-next-line: variable-name

ReactDOM.render(<App />, document.getElementById("app"))
