/* tslint:disable */

import * as React from "react"
import * as ReactDOM from "react-dom"
import FileBrowser from "./components/FileBrowser/FileBrowser"
import Markdown from "markdown-to-jsx"

declare global {
  interface Window {
    require: any
  }
}
const { ipcRenderer } = window.require("electron")

// Import the styles here to process them with webpack
import "@public/style.css"

const App = () => {
  const [fileText, setFileText] = React.useState("")

  React.useEffect(() => {
    ipcRenderer.on("FILE_AS_STRING", (event: any, fileContent: string) => {
      console.log(fileContent)
      console.log(typeof fileContent)
      setFileText(fileContent)
    })
  }, [])

  return (
    <div className="app">
      <h4>Holy Yikes</h4>
      <p>Hello</p>
      <Markdown>{fileText}</Markdown>
      <FileBrowser />
    </div>
  )
}

// tslint:disable-next-line: variable-name

ReactDOM.render(<App />, document.getElementById("app"))
