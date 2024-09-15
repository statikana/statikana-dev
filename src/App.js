import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
	apiKey: "AIzaSyBoxHzEK8v6eR3XWfiUOF5RUxbH-2r2PFs",
	authDomain: "statikana-dev.firebaseapp.com",
	projectId: "statikana-dev",
	storageBucket: "statikana-dev.appspot.com",
	messagingSenderId: "934623527137",
	appId: "1:934623527137:web:980ece75157155c0b5f7a0",
	measurementId: "G-8W2FWT46SZ"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className="App">
			<header>
				
			</header>

			<section>
				{user ? <ChatRoom /> : <SignIn />}
			</section>
		</div>
	);
}

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	}

	return (
		<button onClick={signInWithGoogle}>Sign in with Google</button>
	)
}

function SignOut() {
	return auth.currentUser && (
		<button onClick={() => auth.signOut()}>Sign Out</button>
	)
}

function ChatRoom() {
	const messagesRef = firestore.collection('messages');
	const query = messagesRef.orderBy('createdAt').limit(25);

	const [messages] = useCollectionData(query, { idField: 'id' });

	return (
		<>
			<div>
				{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
			</div>

			<div>

			</div>
		</>
	)
} 

function ChatMessage(props) {
	const { text, uid } = props.message;

	return <p>{text}</p>
}

export default App;
