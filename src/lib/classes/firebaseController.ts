import { initializeApp } from 'firebase/app';
import {
	browserLocalPersistence,
	getAuth,
	onAuthStateChanged,
	setPersistence,
	signInWithPopup,
	signOut
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { User } from '$lib/classes/User';
import {
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

export class FirebaseController {
	private app: any;
	private firebaseController: any;
	user: any;
	private auth: any;
	private token: any;
	private db: any;
	private static instance: FirebaseController;
	private loadingStore: any;
	private userStore: any;

	private constructor(loadingStore: any, userStore: any) {
		this.loadingStore = loadingStore;
		this.userStore = userStore;

		loadingStore.start();

		this.firebaseController = {
			apiKey: import.meta.env.VITE_API_KEY,
			authDomain: import.meta.env.VITE_AUTH_DOMAIN,
			projectId: import.meta.env.VITE_PROJECT_ID,
			storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
			messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
			appId: import.meta.env.VITE_APP_ID
		};

		this.app = initializeApp(this.firebaseController);
		this.auth = getAuth(this.app);

		onAuthStateChanged(this.auth, (user) => {
			this.user = user;
			loadingStore.stop();
			if (!user) return;
			this.user = User.from({
				id: user.uid,
				name: user.displayName ?? '',
				email: user.email ?? '',
				dateCreated: user.metadata.creationTime ?? '',
				token: this.token
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
			this.token = credential?.accessToken;
			// The signed-in user info.
			this.user = result.user;
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
