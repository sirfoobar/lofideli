
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Render the app to the DOM
const root = createRoot(document.getElementById("root")!);
root.render(<App />);
