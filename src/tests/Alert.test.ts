import { Alert } from '$lib/classes/Alert';
import { expect, test } from 'vitest';

test('Testing alert getter and setteeer', () => {
	let alert = new Alert('test', 'success');
	expect(alert.getMessage()).toBe('test');
	expect(alert.getType()).toBe('success');
	alert.setMessage('test1');
	alert.setType('error');
	expect(alert.getMessage()).toBe('test1');
	expect(alert.getType()).toBe('error');

	expect(alert.getId().startsWith('alert')).toBe(true);
});

test('Testing alert constructor to throw an error', () => {
	expect(() => new Alert('', 'success')).toThrowErrorMatchingInlineSnapshot(
		`[Error: Message is required]`
	);
	// expect(() => new Alert('test', '')).toThrowErrorMatchingInlineSnapshot(
	// 	`[Error: Type is required]`
	// );
});
