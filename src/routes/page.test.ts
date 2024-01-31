import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { get } from 'svelte/store';
import { userStore } from '../store/userStore';
import { userToDoStore } from '../store/userToDoStore';
import { firebaseStore } from '../store/firebaseStore';
import Page from './+page.svelte';
import { User } from '$lib/classes/User';
import { generateRandomId } from '$lib/utils/utils';
import { ToDoItem } from '$lib/classes/ToDoItem';
import { vi } from 'vitest';

test('should render user name and todo lists correctly when user is logged in', async () => {
	let mockUser = new User(
		generateRandomId('USER'),
		'Test User',
		'test@gmmail.com',
		new Date().toDateString(),
		'asdasd'
	);
	userStore.set(mockUser);
	let mockToDoList = [
		new ToDoItem(
			generateRandomId('TODO'),
			'Test Title',
			'Test Desc',
			mockUser.getId(),
			new Date('2024-04-04')
		),
		new ToDoItem(
			generateRandomId('TODO'),
			'Test Title2',
			'Test Desc2',
			mockUser.getId(),
			new Date('2024-04-04')
		)
	];
	mockToDoList[0].setCompleted(true);
	userToDoStore.set(mockToDoList);
	const getMyTodosSpy = vi.spyOn(get(firebaseStore), 'getMyTodos').mockResolvedValue(mockToDoList);

	const { getByText } = render(Page);

	await waitFor(() => {
		expect(getByText('WELCOME ! TEST USER')).toBeInTheDocument();
		expect(getByText('Incomplete Tasks')).toBeInTheDocument();
		expect(getByText('Completed Tasks')).toBeInTheDocument();
	});

	expect(getMyTodosSpy).toHaveBeenCalled();

	expect(getByText('TEST TITLE')).toBeInTheDocument();
	expect(getByText('Test Desc')).toBeInTheDocument();
	expect(getByText('TEST TITLE2')).toBeInTheDocument();
	expect(getByText('Test Desc2')).toBeInTheDocument();

	expect(
		getByText('Completed Tasks').compareDocumentPosition(getByText('TEST TITLE')) &
			Node.DOCUMENT_POSITION_FOLLOWING
	).toBeTruthy();
	expect(
		getByText('Incomplete Tasks').compareDocumentPosition(getByText('TEST TITLE2')) &
			Node.DOCUMENT_POSITION_FOLLOWING
	).toBeTruthy();
});

test('should render "No Tasks" when todo list is empty', async () => {
	let mockUser = new User(
		generateRandomId('USER'),
		'Test User',
		'test@gmmail.com',
		new Date().toDateString(),
		'asdasd'
	);
	userStore.set(mockUser);
	userToDoStore.set([]);
	const getMyTodosSpy = vi.spyOn(get(firebaseStore), 'getMyTodos').mockResolvedValue([]);
	const { getByText, getAllByText } = render(Page);
	expect(getMyTodosSpy).toHaveBeenCalled();
	expect(getByText('WELCOME ! TEST USER')).toBeInTheDocument();
	expect(getByText('Incomplete Tasks')).toBeInTheDocument();
	expect(getByText('Completed Tasks')).toBeInTheDocument();
	await waitFor(() => {
		expect(getAllByText('No Tasks!')[0]).toBeInTheDocument();
		expect(getAllByText('No Tasks!')[1]).toBeInTheDocument();
	});
});

test('should create new todo when add button is clicked', async () => {
	let mockUser = new User(
		generateRandomId('USER'),
		'Test User',
		'test@gmmail.com',
		new Date().toDateString(),
		'asdasd'
	);
	userStore.set(mockUser);

	const getMyToDoSpy = vi.spyOn(get(firebaseStore), 'getMyTodos').mockResolvedValue([]);
	const createToDoSpy = vi.spyOn(get(firebaseStore), 'createTodo').mockResolvedValue();
	const { getByTestId, getByText } = render(Page);
	const floatingAddButton = getByTestId('floating-add-button');
	await fireEvent.click(floatingAddButton);

	const titleInput = getByTestId('input-title');
	const descInput = getByTestId('input-description');
	const dueDateInput = getByTestId('input-due-date');
	const addButton = getByTestId('add-button');

	await fireEvent.input(titleInput, { target: { value: 'Test Title' } });
	await fireEvent.input(descInput, { target: { value: 'Test Desc' } });
	await fireEvent.input(dueDateInput, { target: { value: '2024-04-04' } });

	await fireEvent.click(addButton);
	expect(createToDoSpy).toHaveBeenCalled();

	expect(getMyToDoSpy).toHaveBeenCalled();

	expect(getByText('TEST TITLE')).toBeInTheDocument();
	expect(getByText('Test Desc')).toBeInTheDocument();
});

test('should delete todo when delete button is clicked', async () => {
	let mockUser = new User(
		generateRandomId('USER'),
		'Test User',
		'test@gmmail.com',
		new Date().toDateString(),
		'asdasd'
	);
	userStore.set(mockUser);
	let mockToDoList = [
		new ToDoItem(
			generateRandomId('TODO'),
			'Test Title',
			'Test Desc',
			mockUser.getId(),
			new Date('2024-04-04')
		),
		new ToDoItem(
			generateRandomId('TODO'),
			'Test Title2',
			'Test Desc2',
			mockUser.getId(),
			new Date('2024-04-04')
		)
	];
	mockToDoList[0].setCompleted(true);
	userToDoStore.set(mockToDoList);

	const getMyToDoSpy = vi.spyOn(get(firebaseStore), 'getMyTodos').mockResolvedValue(mockToDoList);
	const deleteTodoSpy = vi
		.spyOn(get(firebaseStore), 'deleteTodo')
		.mockImplementation((id: string): any => {
			userToDoStore.update((todos) => todos.filter((todo) => todo.getId() !== id));
		});
	const { getByTestId, getByText } = render(Page);

	expect(getMyToDoSpy).toHaveBeenCalled();

	const deleteButton = getByTestId(`todo-delete-button-${mockToDoList[1].getId()}`);

	await fireEvent.click(deleteButton);
	expect(deleteTodoSpy).toHaveBeenCalled();
	expect(getByText('TEST TITLE2')).not.toBeInTheDocument();
});
