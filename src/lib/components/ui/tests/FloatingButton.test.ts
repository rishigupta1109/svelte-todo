import { render, fireEvent } from '@testing-library/svelte';
import FloatingButton from '../FloatingButton.svelte';
import { vi } from 'vitest';

test('should render floating button correctly', async () => {
	const { getByTestId } = render(FloatingButton, { props: { className: 'test-class' } });

	const button = getByTestId('floating-add-button');
	expect(button).toBeInTheDocument();
	expect(button.className).toContain('test-class');
});

test('should handle click events', async () => {
	const handleClick = vi.fn();
	const { getByTestId } = render(FloatingButton, {
		props: { className: 'test-class' }
	});

	const button = getByTestId('floating-add-button');
	button.addEventListener('click', handleClick);
	await fireEvent.click(button);

	expect(handleClick).toHaveBeenCalled();
});
