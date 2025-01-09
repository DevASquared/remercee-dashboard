import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './tailwind.css';
import Dashboard from "./pages/Dashboard.jsx";
import dotenv from 'dotenv';

dotenv.config();

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Dashboard/>
	</StrictMode>,
)
