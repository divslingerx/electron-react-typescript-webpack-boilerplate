import * as Electron from "electron"
import * as fs from "fs"
import * as path from "path"

// Open File
const openFile = (
  window: Electron.BrowserWindow,
  name: string,
  extensions: string[],
) => {
  // opens file dialog looking for filetype
  const files = Electron.dialog
    .showOpenDialog(window, {
      properties: ["openFile"],
      filters: [
        {
          name,
          extensions,
        },
      ],
    })
    .then(files => {
      if (!files) {
        return false
      } else {
        const file: string = files.filePaths[0]
        const fileContent = fs.readFileSync(file).toString()
        console.log(fileContent)
        window.webContents.send("FILE_AS_STRING", fileContent)
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const openMarkdownFile = (window: Electron.BrowserWindow) =>
  openFile(window, "Markdown", ["md", "mdx", "markdown", "txt"])
