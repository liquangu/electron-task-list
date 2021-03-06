const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width : 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
    mainWindow.webContents.openDevTools()
}

app.whenReady().then(()=>{
    ipcMain.handle('show-notification', (event, ...args) => {
        const notification = {
            title: 'New Task',
            body: `Added: ${args[0]}`
        }
    
        new Notification(notification).show()
    });
    loadMainWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});