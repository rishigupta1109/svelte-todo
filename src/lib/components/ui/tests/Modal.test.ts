import { render, fireEvent } from '@testing-library/svelte';
import Modal from '../Modal.svelte';
import { vi } from 'vitest';

test('should render modal correctly', async () => {
	const { getByTestId } = render(Modal);

	const modal = getByTestId('modal');
	expect(modal).toBeInTheDocument();
});

test('should stop propagation when inner div is clicked', async () => {
	const { getByTestId } = render(Modal);

	const modal = getByTestId('modal');
	const modalClickHandler = vi.fn();
	modal.addEventListener('click', modalClickHandler);
	const innerDiv = getByTestId('modal-data-container');
	let innerClickHandler = vi.fn();
	innerDiv.addEventListener('click', innerClickHandler);
	await fireEvent.click(innerDiv);

	expect(modalClickHandler).not.toHaveBeenCalled();
});
