const { ipcRenderer } = window.require("electron")
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Cookie } from "electron";

export default function App() {
  const [winPopup, setWinPopup] =  useState<WindowProxy | null>(null);
  const [authCookie, setAuthCookie] = useState<Electron.Cookie | null>(null);

  useEffect(() => {
    ipcRenderer.on('duolingo-cookies', (e, cookies: Array<Cookie>) => console.log("COOKIES FIERED!", cookies));
  }, [])

  useEffect(() => {
    ipcRenderer.on('duolingo-data', (e, response) => console.log("DATA FIERED!"));
    
  }, [])

  /*
  useEffect(() => {
    handleCloseWindowPopup();
  }, [winPopup, authCookie])

  function handleCookie(): void {
    ipcRenderer.on('duolingo-cookies', (e, cookies: Array<Electron.Cookie>) => {
      console.log("Cookies: ", cookies)
      //setAuthCookie((prevState) => {return {...prevState, cookies}});
    })
  }

  function handleCloseWindowPopup(): void {
    if (winPopup && authCookie) {
      winPopup.close();
      setWinPopup(null);
    }
  }

  function handleWindowPopup(): void {
    const windowPopup: WindowProxy = window.open('https://www.duolingo.com/log-in?isLoggingIn=true')
    setWinPopup(windowPopup);
  }

  */
  return (
    <div>
      <h1>Duolingo API Application</h1>
      <p>Welcome to your Electron application.</p>

      <Button onButtonClick={() => ipcRenderer.send('request-api-call')}>Fetch Data</Button>
    </div>
  );
}
