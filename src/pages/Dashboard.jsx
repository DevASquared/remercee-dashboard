import {useEffect, useState} from "react";
import {collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove} from "firebase/firestore";
import {storage} from "../fb/firebase";
import {FaEdit, FaTrash, FaPlusCircle} from 'react-icons/fa';

const Dashboard = () => {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [newNoteJudge, setNewNoteJudge] = useState('');
	const [newNoteRate, setNewNoteRate] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async() => {
			const querySnapshot = await getDocs(collection(storage, "users"));
			const usersData = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			setUsers(usersData);
			setLoading(false);
		};

		fetchUsers();
	}, []);

	const handleSelectUser = (user) => {
		setSelectedUser(user);
		setEmail(user.email);
		setUsername(user.username);
		setImageUrl(user.imageUrl);
	};

	const handleSaveChanges = async() => {
		if(!email || !username || !imageUrl) {
			return alert("Tous les champs doivent être remplis");
		}

		const userRef = doc(storage, "users", selectedUser.id);
		await updateDoc(userRef, {email, username, imageUrl});

		alert("Utilisateur mis à jour avec succès!");
		setUsers(prevUsers => prevUsers.map(user => user.id === selectedUser.id ? {
			...user,
			email,
			username,
			imageUrl
		} : user));
	};

	const handleAddNote = async() => {
		if(!newNoteJudge || !newNoteRate) return alert("Veuillez entrer un juge et une note");

		const newNote = {
			judge: newNoteJudge,
			rate: parseFloat(newNoteRate),
			timestamp: Date.now(),
		};

		const userRef = doc(storage, "users", selectedUser.id);
		await updateDoc(userRef, {notes: arrayUnion(newNote)});

		alert("Note ajoutée avec succès!");
		setSelectedUser(prev => ({...prev, notes: [...prev.notes, newNote]}));

		setNewNoteJudge('');
		setNewNoteRate('');
	};

	const handleDeleteNote = async(noteToDelete) => {
		const userRef = doc(storage, "users", selectedUser.id);
		await updateDoc(userRef, {notes: arrayRemove(noteToDelete)});

		alert("Note supprimée avec succès!");
		setSelectedUser(prev => ({
			...prev,
			notes: prev.notes.filter(note => note.timestamp !== noteToDelete.timestamp),
		}));
	};

	if(loading) return <div>Chargement...</div>;

	return (
		<div className="flex p-6 bg-gray-900 text-white min-h-screen gap-6">
			{/* Panneau latéral gauche */}
			<div className="w-1/4 p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold mb-6 text-blue-400">Utilisateurs</h2>
				<ul className="space-y-4">
					{users.map((user, index) => (
						<div key={user.id}>
							<li className="flex justify-between items-center py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
								<span>{user.username}</span>
								<button
									onClick={() => handleSelectUser(user)}
									className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition flex items-center"
								>
									<FaEdit className="mr-2"/> Modifier
								</button>
							</li>
							{/* Séparateur entre les utilisateurs */}
							{index !== users.length - 1 && (
								<hr className="border-gray-600 my-2"/>
							)}
						</div>
					))}
				</ul>
			</div>

			{/* Section principale droite */}
			<div className="w-3/4 p-6 bg-gray-800 rounded-lg shadow-md">
				{selectedUser && (
					<>
						<h2 className="text-3xl font-semibold mb-6 text-green-400">Modifier l'utilisateur</h2>
						<form>
							<div className="mb-6">
								<label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
								<input
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div className="mb-6">
								<label htmlFor="username"
								       className="block text-sm font-medium text-gray-300">Username</label>
								<input
									type="text"
									id="username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div className="mb-6">
								<label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">Image
									URL</label>
								<input
									type="text"
									id="imageUrl"
									value={imageUrl}
									onChange={(e) => setImageUrl(e.target.value)}
									className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<button
								type="button"
								onClick={handleSaveChanges}
								className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition flex items-center"
							>
								Enregistrer les modifications
							</button>
						</form>

						<h2 className="text-3xl font-semibold mt-8 text-green-400 mb-6 ">Ajouter une Note</h2>
						<div className="mb-6">
							<input
								type="text"
								placeholder="Nom du juge"
								value={newNoteJudge}
								onChange={(e) => setNewNoteJudge(e.target.value)}
								className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<input
								type="number"
								placeholder="Note"
								value={newNoteRate}
								onChange={(e) => setNewNoteRate(e.target.value)}
								className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<button
							type="button"
							onClick={handleAddNote}
							className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition flex items-center"
						>
							<FaPlusCircle className="mr-2"/> Ajouter la note
						</button>

						<h2 className="text-3xl font-semibold mt-8 text-green-400">Notes</h2>
						<ul className="space-y-4">
							{selectedUser.notes?.map((note, index) => (
								<div key={note.timestamp}>
									<li className="flex justify-between items-center py-3 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
										<div>
											<p><strong>{note.judge}:</strong> {note.rate}</p>
										</div>
										<button
											onClick={() => handleDeleteNote(note)}
											className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition flex items-center"
										>
											<FaTrash className="mr-2"/> Supprimer
										</button>
									</li>
									{/* Séparateur entre les notes */}
									{index !== selectedUser.notes.length - 1 && (
										<hr className="border-gray-600 my-2"/>
									)}
								</div>
							))}
						</ul>
					</>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
