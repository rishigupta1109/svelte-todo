// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	browserLocalPersistence,
	getAuth,
	inMemoryPersistence,
	onAuthStateChanged,
	setPersistence,
	signInWithPopup,
	signOut
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { userStore } from '../../store/userStore';
import { User } from '$lib/classes/User';
import {
	Firestore,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	initializeFirestore,
	query,
	updateDoc,
	where
} from 'firebase/firestore';
import { ToDoItem } from '$lib/classes/ToDoItem';
import { update } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase

export class FirebaseConfig {
	private app: any;
	private firebaseConfig: any;
	user: any;
	private auth: any;
	private token: any;
	private db: any;
	private todosCollection: any;
	private static instance: FirebaseConfig;
	private constructor() {
		this.firebaseConfig = {
			apiKey: 'AIzaSyDpjriEWFlL3lp_WaZiDigEeV5zIKNlB60',
			authDomain: 'svelte-todo-8ff38.firebaseapp.com',
			projectId: 'svelte-todo-8ff38',
			storageBucket: 'svelte-todo-8ff38.appspot.com',
			messagingSenderId: '362025707474',
			appId: '1:362025707474:web:edfb4635f949bd9a80ca0b'
		};
		this.app = initializeApp(this.firebaseConfig);
		this.auth = getAuth(this.app);
		// console.log(this.auth, this.app);
		onAuthStateChanged(this.auth, (user) => {
			this.user = user;
			if (!user) return;
			this.user = User.from({
				id: user.uid,
				name: user.displayName ?? '',
				email: user.email ?? '',
				dateCreated: user.metadata.creationTime ?? '',
				token: this.token
			});
			userStore.set(this.user);
			console.log('user: ', this.user);
		});
		this.db = getFirestore(this.app);
		// this.todosCollection = this.db.collection('todos');
	}
	static getInstance(): FirebaseConfig {
		if (!this.instance) {
			this.instance = new FirebaseConfig();
		}
		return this.instance;
	}
	signUpWithGoogle: any = async () => {
		try {
			await setPersistence(this.auth, browserLocalPersistence);
			const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
			const credential = GoogleAuthProvider.credentialFromResult(result);
			this.token = credential?.accessToken;
			// The signed-in user info.
			this.user = result.user;
			console.log(this.token, this.user);
			return this.user;
			// IdP data available using getAdditionalUserInfo(result)
			// ...
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			console.log(error, errorCode, errorMessage, email);
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			console.log(credential);
		}
	};
	getUser: any = () => {
		return this.user;
	};
	getTodos: any = async () => {
		const querySnapshot = await getDocs(collection(this.db, 'todos'));
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
		});
	};
	createTodo: any = async (todo: ToDoItem) => {
		const docRef = await addDoc(collection(this.db, 'todos'), {
			id: todo.getId(),
			title: todo.getTitle(),
			description: todo.getDescription(),
			completed: todo.getCompleted(),
			dateCreated: todo.getDateCreated(),
			dateCompleted: todo.getDateCompleted(),
			dateDue: todo.getDateDue(),
			userId: todo.getUserId()
		});
		console.log('Document written with ID: ', docRef.id);
	};
	getMyTodos: any = async (userId: string) => {
		const q = await query(collection(this.db, 'todos'), where('userId', '==', userId));
		const querySnapshot = await getDocs(q);
		let todos: ToDoItem[] = [];
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
			console.log(typeof doc.data().dateDue, Date.parse(doc.data().dateDue));

			todos.push(
				ToDoItem.from({
					id: doc.data().id,
					title: doc.data().title,
					description: doc.data().description,
					completed: doc.data().completed,
					dateCreated: new Date(doc.data().dateCreated.seconds * 1000),
					dateCompleted: new Date(doc.data().dateCompleted) || null,
					dateDue: new Date(doc.data().dateDue.seconds * 1000),
					userId: doc.data().userId
				})
			);
		});
		return todos;
	};
	deleteTodo: any = async (todoId: string) => {
		try {
			const todoRef = collection(this.db, 'todos');
			const q = query(todoRef, where('id', '==', todoId));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				deleteDoc(doc.ref);
			});
			console.log('Todo deleted with todoId:', todoId);
		} catch (error) {
			console.error('Error deleting todo:', error);
		}
	};
	updateTodo: any = async (todo: ToDoItem) => {
		try {
			const todoRef = collection(this.db, 'todos');
			const q = query(todoRef, where('id', '==', todo.getId()));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				updateDoc(doc.ref, {
					id: todo.getId(),
					title: todo.getTitle(),
					description: todo.getDescription(),
					completed: todo.getCompleted(),
					dateCreated: todo.getDateCreated(),
					dateCompleted: todo.getDateCompleted(),
					dateDue: todo.getDateDue(),
					userId: todo.getUserId()
				});
			});
			console.log('Todo updated with todoId:', todo);
		} catch (error) {
			console.error('Error updating todo:', error);
		}
	};
	signOut: any = async () => {
		try {
			await signOut(this.auth);
			userStore.set(null);
		} catch (error) {
			console.log(error);
		}
	};
}
