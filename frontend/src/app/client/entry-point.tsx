import 'modern-normalize/modern-normalize.css';
import '@mantine/core/styles.css';
import { createRoot } from "react-dom/client"
import { App } from "../ui/App"
import { appStarted } from "shared/app"


const root = createRoot(document.getElementById("root")!)

appStarted()

root.render(<App />)
