import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
	browserLocalPersistence,
	getAuth,
	onAuthStateChanged,
	setPersistence,
	signInWithPopup,
	signOut,
	type Auth
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { User } from '$lib/classes/User';
import {
	Firestore,
	addDoc,
	collection,
	deleteDoc,
	getDocs,
	getFirestore,
	query,
	updateDoc,
	where
} from 'firebase/firestore';
import { ToDoItem } from '$lib/classes/ToDoItem';
import type { Writable } from 'svelte/store';
import type { WritableLoadingStore } from '../../store/loadingStore';

interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
}

export class FirebaseController {
	private app: FirebaseApp;
	private auth: Auth;
	private db: Firestore;
	private firebaseControllerConfig: FirebaseConfig;
	private loadingStore: WritableLoadingStore;
	private token: string = '';
	private user: User | null = null;
	private userStore: Writable<User | null>;

	private static instance: FirebaseController;

	private constructor(loadingStore: any, userStore: any) {
		this.loadingStore = loadingStore;
		this.userStore = userStore;

		loadingStore.start();

		this.firebaseControllerConfig = {
			apiKey: import.meta.env.VITE_API_KEY,
			authDomain: import.meta.env.VITE_AUTH_DOMAIN,
			projectId: import.meta.env.VITE_PROJECT_ID,
			storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
			messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
			appId: import.meta.env.VITE_APP_ID
		};

		this.app = initializeApp(this.firebaseControllerConfig);
		this.auth = getAuth(this.app);

		onAuthStateChanged(this.auth, (user: any) => {
			loadingStore.stop();
			this.user = null;
			if (!user) return;
			console.log(user);
			this.user = User.from({
				id: user.uid,
				name: user.displayName ?? '',
				email: user.email ?? '',
				dateCreated: user.metadata.creationTime ?? '',
				token: user?.accessToken ?? ''
			});
			this.userStore.set(this.user);
		});
		this.db = getFirestore(this.app);
	}

	static getInstance(loadingStore: any, userStore: any): FirebaseController {
		if (!this.instance) {
			this.instance = new FirebaseController(loadingStore, userStore);
		}
		return this.instance;
	}

	signUpWithGoogle: any = async () => {
		try {
			await setPersistence(this.auth, browserLocalPersistence);
			const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
			const credential = GoogleAuthProvider.credentialFromResult(result);
			this.token = credential?.accessToken || '';
			// The signed-in user info.
			if (!result.user) throw new Error('No user found');
			this.user = User.from({
				id: result.user.uid,
				name: result.user.displayName ?? '',
				email: result.user.email ?? '',
				dateCreated: result.user.metadata.creationTime ?? '',
				token: this.token
			});
			return this.user;
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			console.log(error, errorCode, errorMessage, email);
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			console.log(credential);
			throw new Error(error);
		}
	};
	getUser = () => {
		return this.user;
	};

	getTodos = async () => {
		const querySnapshot = await getDocs(collection(this.db, 'todos'));
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
		});
	};
	createTodo = async (todo: ToDoItem) => {
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
	getMyTodos = async (userId: string) => {
		this.loadingStore.start();
		const q = await query(collection(this.db, 'todos'), where('userId', '==', userId));
		const querySnapshot = await getDocs(q);
		let todos: ToDoItem[] = [];
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
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
		this.loadingStore.stop();
		return todos;
	};
	deleteTodo = async (todoId: string) => {
		const todoRef = collection(this.db, 'todos');
		const q = query(todoRef, where('id', '==', todoId));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			deleteDoc(doc.ref);
		});
		console.log('Todo deleted with todoId:', todoId);
	};
	updateTodo = async (todo: ToDoItem) => {
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
	};
	signOut = async () => {
		await signOut(this.auth);
		this.userStore.set(null);
	};
}
