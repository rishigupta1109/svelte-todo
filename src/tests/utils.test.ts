import {
	generateRandomId,
	getBgColor,
	getDueDateHTML,
	getRandomChar,
	getRemainingDays,
	getTimeInLocaleString,
	isToday,
	isValidDateString,
	isValidDueDate,
	isValidEmail,
	isValidId,
	isValidString
} from '$lib/utils/utils';
import { expect, test } from 'vitest';

test('Testing getRandomChar function to return a string', () => {
	let testCases = [
		{ length: 1, expected: 'string' },
		{ length: 2, expected: 'string' },
		{ length: 3, expected: 'string' }
	];
	testCases.forEach((testCase) => {
		expect(typeof getRandomChar(testCase.length)).toBe(testCase.expected);
		expect(getRandomChar(testCase.length).length).toBe(testCase.length);
	});
	expect(getRandomChar(0)).toBe('');
});

test('Testing with invalid length to throw an error', () => {
	expect(() => getRandomChar(-1)).toThrowErrorMatchingInlineSnapshot(`[Error: Invalid length]`);
});

test('Testing getTimeInLocaleString function to return a string of length 13', () => {
	expect(getTimeInLocaleString().length).toBe(13);
});
test('Testing getTimeInLocaleString function to return a time', () => {
	expect(getTimeInLocaleString()).toBe(new Date().getTime().toString());
});

test('Testing generateRandomId function to return a string', () => {
	expect(typeof generateRandomId()).toBe('string');
});
test('Testing generateRandomId function to return a string of particular length ', () => {
	let testCases = [
		{ prefix: 'TODO', expected: 19 },
		{ prefix: 'alert', expected: 20 },
		{ prefix: '', expected: 15 }
	];
	testCases.forEach((testCase) => {
		expect(generateRandomId(testCase.prefix).length).toBe(testCase.expected);
	});
});

test('Testing generateRandomId function to return a string thats startsWithPrefix ', () => {
	let testCases = [
		{ prefix: 'TODO', expected: 19 },
		{ prefix: 'alert', expected: 20 },
		{ prefix: '', expected: 15 }
	];
	testCases.forEach((testCase) => {
		expect(generateRandomId(testCase.prefix).startsWith(testCase.prefix)).toBe(true);
	});
});

test('Testing generateRandomId function to return a string thats is unique ', () => {
	let testCases = [
		{ prefix: 'TODO', expected: 19 },
		{ prefix: 'alert', expected: 20 },
		{ prefix: '', expected: 15 }
	];
	testCases.forEach((testCase) => {
		expect(generateRandomId(testCase.prefix)).not.toBe(generateRandomId(testCase.prefix));
	});
});

test("Testing isValidString function to return true if it's a valid string else false", () => {
	let testCases = [
		{ str: 'test', expected: true },
		{ str: '', expected: false },
		{ str: 'test test', expected: true },
		{ str: 'test test test', expected: true },
		{ str: 'test test test test', expected: true },
		{ str: 'test test test test test', expected: false, length: 10 }
	];
	testCases.forEach((testCase) => {
		if (testCase.length) {
			return expect(isValidString(testCase.str, testCase.length)).toBe(testCase.expected);
		}
		expect(isValidString(testCase.str)).toBe(testCase.expected);
	});
});

test('Testing isValidString function to throw an error if length is invalid', () => {
	expect(() => isValidString('test', -1)).toThrowErrorMatchingInlineSnapshot(
		`[Error: Invalid charLimit]`
	);
});

test("Testing is isValidDueDate function to return true if it's a valid date else false", () => {
	let testCases = [
		{
			date: new Date(),
			expected: true
		},
		{
			date: new Date('2021-09-01'),
			expected: false
		},
		{
			date: new Date('2024-02-02'),
			expected: true
		}
	];
	testCases.forEach((testCase) => {
		expect(isValidDueDate(testCase.date)).toBe(testCase.expected);
	});
});

test("Testing isValidId function to return true if it's a valid id else false", () => {
	let testCases = [
		{
			value: generateRandomId(),
			expected: true
		},
		{
			value: '',
			expected: false
		},
		{
			value: 'test',
			expected: false
		},
		{
			value: 'TODO',
			expected: false
		},
		{
			value: 'TODOA',
			expected: false
		},
		{
			value: 'TODOAB',
			expected: false
		},
		{
			value: 'TODOAB1234567890123',
			expected: true
		},
		{
			value: 'TODOAB12345678901234',
			expected: false
		}
	];
	testCases.forEach((testCase) => {
		const { value, expected } = testCase;
		const result = isValidId(value);
		expect(result).toBe(expected);
	});
});

test("Testing isToday function to return true if it's a today else false", () => {
	let testCases = [
		{
			date: new Date(),
			expected: true
		},
		{
			date: new Date('2021-09-01'),
			expected: false
		},
		{
			date: new Date('2024-02-02'),
			expected: false
		}
	];
	testCases.forEach((testCase) => {
		expect(isToday(testCase.date)).toBe(testCase.expected);
	});
});

test("Testing getRemainigDays function to return 'Overdue' if date is in past else return days remaining", () => {
	let testCases = [
		{
			date: new Date(),
			expected: 'Today'
		},
		{
			date: new Date('2021-09-01'),
			expected: 'Overdue'
		},
		{
			date: new Date('2024-02-02'),
			expected: '2 days remaining'
		}
	];
	testCases.forEach((testCase) => {
		expect(getRemainingDays(testCase.date)).toBe(testCase.expected);
	});
});

test("Testing getDueDateHTML function to return a string with class 'text-red-400' if date is in past else return a string with class 'text-black opacity-65'", () => {
	let testCases = [
		{
			date: new Date(),
			expected: '<p class="text-blue-400">due : Today</p>'
		},
		{
			date: new Date('2021-09-01'),
			expected: '<p class="text-red-400">due : Wed Sep 01 2021</p>'
		},
		{
			date: new Date('2024-02-02'),
			expected: '<p class="text-black opacity-65">due : Fri Feb 02 2024 ( 2 days remaining)</p>'
		}
	];
	testCases.forEach((testCase) => {
		expect(getDueDateHTML(testCase.date)).toBe(testCase.expected);
	});
});

test("Testing getBgColor function to return a string with class 'bg-green-500' if type is 'success' else return a string with class 'bg-gray-500'", () => {
	let testCases = [
		{
			type: 'success',
			expected: 'bg-green-500'
		},
		{
			type: 'error',
			expected: 'bg-red-500'
		},
		{
			type: 'warning',
			expected: 'bg-yellow-500'
		},
		{
			type: 'info',
			expected: 'bg-blue-500'
		},
		{
			type: 'test',
			expected: 'bg-gray-500'
		}
	];
	testCases.forEach((testCase) => {
		expect(getBgColor(testCase.type)).toBe(testCase.expected);
	});
});

test("Testing isValidEmail function to return true if it's a valid email else false", () => {
	let testCases = [
		{
			email: '',
			expected: false
		},
		{
			email: 'emailId',
			expected: false
		},
		{
			email: 'rishi@gmail.com',
			expected: true
		},
		{
			email: 'test@db.com',
			expected: true
		}
	];
	testCases.forEach((testCase) => {
		expect(isValidEmail(testCase.email)).toBe(testCase.expected);
	});
});

test("Testing isValidDateString function to return true if it's a valid date string else false", () => {
	let testCases = [
		{
			dateString: '',
			expected: false
		},
		{
			dateString: '2021-09-01',
			expected: true
		},
		{
			dateString: '2024-02-02',
			expected: true
		},
		{
			dateString: '2021-09-01 12:00:00',
			expected: true
		},
		{
			dateString: '2021-09-01 12:00',
			expected: true
		},
		{
			dateString: '2021-09-01 12',
			expected: false
		},
		{
			dateString: '2021-09-01 12:00:00:00',
			expected: true
		},
		{
			dateString: '2021-09-01 12:00:00:00:00',
			expected: false
		},
		{
			dateString: '2021-09-01 12:00:00:00:00:00',
			expected: false
		}
	];

	testCases.forEach((testCase) => {
		console.log(testCase.dateString, isValidDateString(testCase.dateString), testCase.expected);
		expect(isValidDateString(testCase.dateString)).toBe(testCase.expected);
	});
});
