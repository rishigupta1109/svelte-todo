import { ToDoItem } from '$lib/classes/ToDoItem';
import { generateRandomId } from '$lib/utils/utils';
import { render } from '@testing-library/svelte';
import ToDoList from '../ToDoList.svelte';

let mockToDoList: ToDoItem[] = [
	new ToDoItem(generateRandomId('TODO'), 'Test 1', 'desc1', 'userid1', new Date('2024-02-02')),
	new ToDoItem(generateRandomId('TODO'), 'Test 2', 'desc2', 'userid2', new Date('2024-02-02'))
];

it('should display the todo list correctly', () => {
	const { getByTestId } = render(ToDoList, {
		props: {
			toDoList: mockToDoList
		}
	});
	const list = getByTestId('todo-list');
	expect(list).toBeInTheDocument();
	expect(list.children.length).toBe(mockToDoList.length);
});
