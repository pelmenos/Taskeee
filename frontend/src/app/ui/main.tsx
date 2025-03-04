import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App.tsx"
import { appStarted } from "shared/app"
import "shared/app/styles/index.css"

const root = createRoot(document.getElementById("root")!)

root.render(<App />)

appStarted()
