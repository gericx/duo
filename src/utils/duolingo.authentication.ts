import { BrowserWindow } from "electron"
import { RedisClientType } from "redis";

export const duolingoAuthentication = (rc: RedisClientType) => {
  return new Promise<Array<Electron.Cookie>> ( async (resolve, reject) => {
    const loginWindow = new BrowserWindow({
      alwaysOnTop: true,
    });

    let duolingoCookiesStore: Array<Electron.Cookie> = [];
    // Load login page
    const duolingoLoginUrl: string = process.env.DUOLINGO_LOGIN_URL;
    loginWindow.loadURL(duolingoLoginUrl);
    loginWindow.webContents.on("did-finish-load", () => {
      loginWindow.webContents.getURL();
      // Waits for the page to navigate to another link
      loginWindow.webContents.on("did-navigate-in-page", (e: Electron.Event) => {
      loginWindow.webContents.session.cookies.get({})
      .then(async (cookies) => {

        for (let cookie of cookies) {
          try {
            await rc.set(cookie.name, cookie.value);
          } catch (e) {
            throw new Error(`Faild to save data for key=${cookie.name} on error: ${e}`);
          }
        }

        loginWindow.close();

        duolingoCookiesStore.push(...cookies);
        resolve(duolingoCookiesStore);
      });
    });
  });
  })
} 
