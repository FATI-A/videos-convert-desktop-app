const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("app", {
  // Your code here
  addVideo: (path, videoHandler) => {
    ipcRenderer.send("video:add", path);
    ipcRenderer.on("metadata:completed", (event, metadata) => {
      videoHandler(metadata);
    });
  },
  convertVideo: (video, originPath, ext, convertProgress) => {
    ipcRenderer.send("convert:start", video, originPath, ext);
    ipcRenderer.on("metaconvert:completed", (event, progress, id) => {
      convertProgress(progress, id);
    });
  },

  openFolder: (video, ext, openFolderPath) => {
    ipcRenderer.send("openFolder", video, ext);
    ipcRenderer.on("openFolder:opened", (event, path, id) =>
      openFolderPath(path, id)
    );
  },
});
