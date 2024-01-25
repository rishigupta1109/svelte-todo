import type { Alert } from '$lib/classes/Alert';
import { writable, type Writable } from 'svelte/store';

function createAlertStore() {
	const { subscribe, set, update }: Writable<Alert[]> = writable([]);
	function add(alert: Alert) {
		update((alerts) => [...alerts, alert]);
		setTimeout(() => {
			remove(alert);
		}, 2000);
	}
	function remove(alert: Alert) {
		update((alerts) => alerts.filter((a) => a.getId() !== alert.getId()));
	}
	return {
		subscribe,
		set,
		update,
		add,
		remove
	};
}
export const alertStore = createAlertStore();
