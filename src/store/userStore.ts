import type { User } from '$lib/classes/User';
import { writable, type Writable } from 'svelte/store';

function createUserStore() {
	const { subscribe, set, update }: Writable<User | null> = writable(null);
	return {
		subscribe,
		set,
		update
	};
}

export const userStore: Writable<User | null> = createUserStore();
