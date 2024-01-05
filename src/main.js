const { app, BrowserWindow, ipcMain, shell} = require("electron");
const Ffmpeg = require("fluent-ffmpeg");

let mainWindow;
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "convert2.jpeg",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on("closed", () => (mainWindow = null));

  // mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

ipcMain.on("video:add", (event, path) => {
  Ffmpeg.ffprobe(path, (error, metadata) => {
    if (error) return console.error(error);
    const result = {
      ...metadata.format,
      duration: metadata.format.duration,
      path: path,
    };
    mainWindow.webContents.send("metadata:completed", result);
  });
});

//Exemple convertier
ipcMain.on("convert:start", (event, video, originPath, ext) => {
  const filename = video.filename;
  Ffmpeg(originPath)
    .output(
      `C:\\Users\\fatih\\OneDrive\\Bureau\\Convert\\${filename}-converted.${ext}`
    )
    .on("progress", (e) => {
      console.log("convert in progress...");
      mainWindow.webContents.send("metaconvert:completed", e.percent, video.id);
    })
    .on("end", () => console.log("convert done"))
    .run();
});

//open folder
ipcMain.on("openFolder", (event, video, ext) => {
  console.log("video", video);
  const filename = video.filename;
  shell.openPath(
    `C:\\Users\\fatih\\OneDrive\\Bureau\\Convert\\${filename}-converted.${ext}`
  );
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
