import { render } from '@testing-library/svelte';
import { expect, it, vi } from 'vitest';
import ToDo from '../ToDo.svelte';
import { ToDoItem } from '$lib/classes/ToDoItem';
import { generateRandomId } from '$lib/utils/utils';
const mockItem: any = new ToDoItem(
	generateRandomId('TODO'),
	'test',
	'test',
	'test',
	new Date('2024-02-02')
);
let mockRemoveFromList = () => {};

it('should display the todo item correctly', () => {
	const { getByTestId } = render(ToDo, {
		props: {
			toDo: mockItem
		}
	});

	const todoItem = getByTestId(`todo-item-${mockItem.getId()}`);
	const checkbox = getByTestId(`todo-checkbox-${mockItem.getId()}`);
	const deleteButton = getByTestId(`todo-delete-button-${mockItem.getId()}`);

	expect(todoItem).toHaveTextContent(mockItem.getTitle());
	expect(todoItem).toHaveTextContent(mockItem.getDescription());
	expect(todoItem).toHaveTextContent(mockItem.getDateDue().toDateString());
	expect(checkbox).not.toBeChecked();
	expect(deleteButton).toBeInTheDocument();
});

it('should display the delete button with svg in todo', () => {
	const { getByTestId } = render(ToDo, {
		props: {
			toDo: mockItem
		}
	});
	const deleteButton = getByTestId('todo-delete-button-' + mockItem.getId());

	expect(deleteButton).toBeInTheDocument();
	expect(deleteButton).toContainElement(getByTestId('delete-svg'));
});

const mockCompletedItem = new ToDoItem(
	generateRandomId('TODO'),
	'test',
	'test',
	'test',
	new Date()
);

mockCompletedItem.setCompleted(true);

it('should check the checkbox when the item is completed', () => {
	const { getByTestId } = render(ToDo, {
		props: {
			toDo: mockCompletedItem
		}
	});

	const todoItem = getByTestId('done-item-' + mockCompletedItem.getId());
	expect(todoItem).toHaveTextContent(mockItem.getTitle());
	expect(todoItem).toHaveTextContent(mockItem.getDescription());
	if (mockItem.getDateCompleted()) {
		expect(todoItem).toHaveTextContent(
			'test Completed on' + mockItem?.getDateCompleted().toDateString()
		);
	}
	const checkbox = getByTestId('done-checkbox-' + mockCompletedItem.getId());
	expect(checkbox).toBeChecked();
});

// it('should call the remove function when delete button is clicked', () => {
// 	const { getByTestId } = render(ToDo, {
// 		props: {
// 			toDo: mockItem
// 		}
// 	});
// 	const deleteButton = getByTestId('todo-delete-button-' + mockItem.getId());
// 	deleteButton.click();
// 	expect(deleteButton).toBeInTheDocument();
// 	expect(deleteButton).toContainElement(getByTestId('delete-svg'));

// 	expect(mockRemove).toHaveBeenCalled();
// });
