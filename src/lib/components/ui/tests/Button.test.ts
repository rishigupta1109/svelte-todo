import { render, fireEvent } from '@testing-library/svelte';
import Button from '../Button.svelte';
import { vi } from 'vitest';

test('should render button type correctly', async () => {
	const { getByTestId } = render(Button, {
		props: { type: 'button', cta: 'Click me', testId: 'test-button' }
	});

	const button = getByTestId('test-button');
	expect(button.tagName).toBe('BUTTON');
	expect(button.textContent).toBe('Click me');
});

test('should render link type correctly', async () => {
	const { getByTestId } = render(Button, {
		props: { type: 'link', cta: 'Click me', testId: 'test-link' }
	});

	const link = getByTestId('test-link');
	expect(link.tagName).toBe('A');
	expect(link.textContent).toBe('Click me');
});

test('should render submit type correctly', async () => {
	const { getByTestId } = render(Button, {
		props: { type: 'submit', cta: 'Submit', testId: 'test-submit' }
	});

	const input = getByTestId('test-submit');
	expect(input.tagName).toBe('INPUT');
	expect(input.getAttribute('type')).toBe('submit');
});

test('should handle click events', async () => {
	const { getByTestId } = render(Button, {
		props: { type: 'button', cta: 'Click me', testId: 'test-button' }
	});

	const button = getByTestId('test-button');
	const handleClick = vi.fn();
	button.addEventListener('click', handleClick);
	await fireEvent.click(button);

	expect(handleClick).toHaveBeenCalled();
});
