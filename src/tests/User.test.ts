import { User } from '$lib/classes/User';
import { generateRandomId } from '$lib/utils/utils';
import { expect, test } from 'vitest';

test('Testing getter and setter function of User class', () => {
	let id = generateRandomId('USER');
	let name = 'test';
	let email = 'test@gmail.com';
	let dateCreated = new Date().toString();
	let token = 'test';
	let user = new User(id, name, email, dateCreated, token);
	expect(user.getId()).toBe(id);
	expect(user.getName()).toBe(name);
	expect(user.getEmail()).toBe(email);
	expect(user.getDateCreated()).toBeInstanceOf(Date);
	expect(user.getToken()).toBe(token);

	let newId = generateRandomId('USER');
	let newName = 'test1';
	let newEmail = 'test1@gmail.com';
	let newDateCreated = new Date().toString();
	let newToken = 'test1';

	user.setId(newId);
	user.setName(newName);
	user.setEmail(newEmail);
	user.setDateCreated(new Date(newDateCreated));
	user.setToken(newToken);

	expect(user.getId()).toBe(newId);
	expect(user.getName()).toBe(newName);
	expect(user.getEmail()).toBe(newEmail);
	expect(user.getDateCreated()).toBeInstanceOf(Date);
	expect(user.getDateCreated().toString()).toBe(new Date(newDateCreated).toString());
	expect(user.getToken()).toBe(newToken);
});

test('Testing from function of User class', () => {
	let testCases = [
		{
			id: generateRandomId('USER'),
			name: 'test',
			email: 'test@gmail.com',
			dateCreated: new Date().toString(),
			token: 'test'
		}
	];
	testCases.forEach((testCase) => {
		let user = User.from(testCase);
		expect(user.getId()).toBe(testCase.id);
		expect(user.getName()).toBe(testCase.name);
		expect(user.getEmail()).toBe(testCase.email);
		expect(user.getDateCreated()).toBeInstanceOf(Date);
		expect(user.getToken()).toBe(testCase.token);
	});
});

test('Testing isValid function of User class', () => {
	let testCases = [
		{
			id: generateRandomId('USER'),
			name: 'test',
			email: '',
			dateCreated: new Date().toString(),
			token: 'test',
			expected: false
		},
		{
			id: generateRandomId('USER'),
			name: 'test',
			email: 'emailId',
			dateCreated: new Date().toString(),
			token: 'test',
			expected: false
		},
		{
			id: generateRandomId('USER'),
			name: '',
			email: 'email@gmail.com',
			dateCreated: new Date().toString(),
			token: 'test',
			expected: false
		},
		{
			id: '',
			name: 'test',
			email: 'email@gmail.com',
			dateCreated: new Date().toString(),
			token: 'test',
			expected: false
		},
		{
			id: '',
			name: 'test',
			email: 'email@gmail.com',
			dateCreated: 'sda',
			token: 'test',
			expected: false
		},
		{
			id: generateRandomId('USER'),
			name: 'test',
			email: 'email@gmmail.com',
			dateCreated: new Date().toString(),
			token: 'asdasdasdasd',
			expected: true
		}
	];
	testCases.forEach((testCase) => {
		const { id, name, email, dateCreated, token } = testCase;
		expect(User.areValidFields(id, name, email, dateCreated, token)).toBe(testCase.expected);
	});
});

test('Testing initialisation of user with invalid values to throw error', () => {
	expect(() => new User('', '', '', '', '')).toThrowErrorMatchingInlineSnapshot(
		`[Error: Invalid fields]`
	);
});
