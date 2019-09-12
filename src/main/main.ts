"use strict"

/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow, Menu, MenuItem } from "electron"
import * as path from "path"
import * as url from "url"
import { openMarkdownFile } from "./lib/openFile"

let mainWindow: Electron.BrowserWindow

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    vibrancy: "dark",

    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      devTools: process.env.NODE_ENV === "production" ? false : true,
    },
  })

  // and load the index.html of the app.
  // tslint:disable-next-line: no-floating-promises
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index.html"),
      protocol: "file:",
      slashes: true,
    }),
  )

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// create Menu
const isMac: boolean = process.platform === "darwin"

const template: any = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.getName(),
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [
      {
        label: "Open Folder",
      },
      {
        label: "Open File",
        accelerater: "CmdOrCtl+O",
        click() {
          openMarkdownFile(mainWindow)
        },
      },
      isMac ? { role: "close" } : { role: "quit" },
    ],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron")
          await shell.openExternal("https://electronjs.org")
        },
      },
    ],
  },
  {
    label: "Developer",
    submenu: [
      {
        label: "Toggle Developer Tools",
        accellerator: isMac ? "Alt+Command+I" : "Ctrl+Shift+I",
        click() {
          mainWindow.webContents.toggleDevTools()
        },
      },
    ],
  },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
