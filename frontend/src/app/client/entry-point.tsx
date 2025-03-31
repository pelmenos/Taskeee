import 'modern-normalize/modern-normalize.css';
import '@mantine/core/styles.css';
import { createRoot } from "react-dom/client"
import { appStarted } from "shared/app"
import { App } from "../ui/App"


const root = createRoot(document.getElementById("root")!)

appStarted()

root.render(<App />)
