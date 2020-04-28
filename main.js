const { ipcMain } = require('electron')
const {app, BrowserWindow ,dialog} = require('electron')


let mainWindow, DisplayHeight,DisplayWidth;
// Create a new BrowserWindow when `app` is ready
function createWindow () {
  let {width, height} = require('electron').screen.getPrimaryDisplay().size
  DisplayHeight = height ;
  DisplayWidth = width;
  mainWindow = new BrowserWindow({
    width,height,
    webPreferences: { 
      nodeIntegration: true 
    },
    frame:false,
    options:{
			fullscreen:true
		}
  })
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('./src/index.html');

  // Open DevTools - Remove for PRODUCTION!
  //mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})