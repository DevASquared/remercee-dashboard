import "./../tailwind.css";
import {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {app} from '../fb/firebase.js';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const auth = getAuth(app);

	const handleLogin = async(e) => {
		e.preventDefault();
		setError('');

		try {
			await signInWithEmailAndPassword(auth, email, password);
			alert('Connexion réussie !');
		} catch(err) {
			setError(err.message);
		}
	};

	return (<div
			className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
			<div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
				<h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h1>
				{error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
				<form onSubmit={handleLogin}>
					<div className="mb-5">
						<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
							required
						/>
					</div>
					<div className="mb-5">
						<label htmlFor="password"
						       className="block text-sm font-medium text-gray-700 mb-2">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out"
					>
						Login
					</button>
				</form>
				<p className="text-center text-sm mt-4 text-gray-600">
					Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
				</p>
			</div>
		</div>);
};

export default LoginPage;
