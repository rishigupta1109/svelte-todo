import { ToDoItem } from '$lib/classes/ToDoItem';
import { generateRandomId } from '$lib/utils/utils';
import { expect, test } from 'vitest';

test('Testing Todo getter and setteeer', () => {
	let todo = new ToDoItem(generateRandomId('TODO'), 'test', 'test', 'test', new Date());
	expect(todo.getId().startsWith('TODO')).toBe(true);
	expect(todo.getTitle()).toBe('test');
	expect(todo.getDescription()).toBe('test');
	expect(todo.getCompleted()).toBe(false);
	expect(todo.getDateCreated()).toBeInstanceOf(Date);
	expect(todo.getDateCompleted()).toBe(null);
	expect(todo.getDateDue()).toBeInstanceOf(Date);
	expect(todo.getUserId()).toBe('test');

	todo.setId(generateRandomId('TODO'));
	todo.setTitle('test1');
	todo.setDescription('test1');
	todo.setCompleted(true);
	todo.setDateCompleted(new Date());
	todo.setDateDue(new Date());
	todo.setUserId('test1');
	todo.setDateCreated(new Date());

	expect(todo.getId().startsWith('TODO')).toBe(true);
	expect(todo.getTitle()).toBe('test1');
	expect(todo.getDescription()).toBe('test1');
	expect(todo.getCompleted()).toBe(true);
	expect(todo.getDateCreated()).toBeInstanceOf(Date);
	expect(todo.getDateCompleted()).toBeInstanceOf(Date);
	expect(todo.getDateDue()).toBeInstanceOf(Date);
	expect(todo.getUserId()).toBe('test1');
});

test('Testing from function of Todo class', () => {
	let testCases = [
		{
			id: generateRandomId('TODO'),
			title: 'test',
			description: 'test',
			completed: false,
			dateCreated: new Date(),
			dateCompleted: null,
			dateDue: new Date('2024-09-02'),
			userId: 'test'
		}
	];
	testCases.forEach((testCase) => {
		let todo = ToDoItem.from(testCase);
		expect(todo.getId()).toBe(testCase.id);
		expect(todo.getTitle()).toBe(testCase.title);
		expect(todo.getDescription()).toBe(testCase.description);
		expect(todo.getCompleted()).toBe(testCase.completed);
		expect(todo.getDateCreated()).toBeInstanceOf(Date);
		expect(todo.getDateCompleted()).toBe(testCase.dateCompleted ? testCase.dateCompleted : null);
		expect(todo.getDateDue()).toBeInstanceOf(Date);
		expect(todo.getUserId()).toBe(testCase.userId);
	});
});

test('Testing todo with invalid ips', () => {
	let testCases: any = [
		{
			id: generateRandomId('TODO'),
			title: '',
			description: 'test',
			completed: false,
			dateCreated: new Date(),
			dateCompleted: null,
			dateDue: new Date('2024-09-02'),
			userId: 'test',
			expectedError: '[Error: Invalid title in ToDoItem]'
		},
		{
			id: generateRandomId('TODO'),
			title: 'test',
			description: '',
			completed: false,
			dateCreated: new Date(),
			dateCompleted: null,
			dateDue: new Date('2024-09-02'),
			userId: 'test',
			expectedError: '[Error: Invalid description in ToDoItem]'
		},
		{
			id: generateRandomId('TODO'),
			title: 'test',
			description: 'test',
			completed: false,
			dateCreated: new Date(),
			dateCompleted: null,
			dateDue: '',
			userId: 'test',
			expectedError: '[Error: Invalid dateDue in ToDoItem]'
		},
		{
			id: generateRandomId('TODO'),
			title: 'test',
			description: 'test',
			completed: false,
			dateCreated: new Date(),
			dateCompleted: null,
			dateDue: new Date('2024-09-02'),
			userId: '',
			expectedError: '[Error: Invalid userId in ToDoItem]'
		}
	];
	testCases.forEach((testCase: any) => {
		expect(() => ToDoItem.from(testCase)).toThrowErrorMatchingInlineSnapshot(
			testCase.expectedError
		);
	});
});
