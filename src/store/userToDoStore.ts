import type { ToDoItem } from '$lib/classes/ToDoItem';
import { writable, type Writable } from 'svelte/store';

function createUserNotesStore() {
	const { set, subscribe, update }: Writable<ToDoItem[]> = writable([]);
	const append = (item: ToDoItem): void => {
		update((items: ToDoItem[]) => [...items, item]);
	};
	const remove = (id: string): void => {
		update((items: ToDoItem[]) => items.filter((item: ToDoItem) => item.getId() !== id));
	};
	const toggle = (id: string): void => {
		update((items: ToDoItem[]) =>
			items.map((item: ToDoItem) => {
				if (item.getId() === id) {
					item.setCompleted(!item.getCompleted());
				}
				return item;
			})
		);
	};
	const updateItem = (item: ToDoItem): void => {
		update((items: ToDoItem[]) => {
			const index = items.findIndex((i: ToDoItem) => i.getId() === item.getId());
			if (index !== -1) {
				items[index] = item;
			}
			return items;
		});
	};
	return {
		subscribe,
		set,
		update,
		append,
		remove,
		toggle,
		updateItem
	};
}
