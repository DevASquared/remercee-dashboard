import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Utilisation de BrowserRouter
import LoginPage from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	</StrictMode>
);
