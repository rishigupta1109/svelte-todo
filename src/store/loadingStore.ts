import type { User } from '$lib/classes/User';
import { writable, type Writable } from 'svelte/store';

function createLoadingStore() {
	const { subscribe, set, update }: Writable<boolean> = writable(false);
	function start() {
		set(true);
	}
	function stop() {
		set(false);
	}
	return {
		subscribe,
		set,
		update,
		start,
		stop
	};
}

export const loadingStore = createLoadingStore();

export interface WritableLoadingStore extends Writable<boolean> {
	start: () => void;
	stop: () => void;
}
