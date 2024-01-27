import { FirebaseController } from '$lib/classes/firebaseController';
import { writable, type Writable } from 'svelte/store';
import { loadingStore } from './loadingStore';
import { userStore } from './userStore';

function createFirebaseStore() {
	const { subscribe, set, update } = writable(
		FirebaseController.getInstance(loadingStore, userStore)
	);

	return {
		subscribe,
		set,
		update
	};
}

export const firebaseStore = createFirebaseStore();
