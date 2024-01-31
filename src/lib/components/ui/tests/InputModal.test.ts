import { render, fireEvent, waitFor } from '@testing-library/svelte';
import InputModal from '../InputModal.svelte';
import { tick } from 'svelte';
import { vi } from 'vitest';

test('should render floating button correctly', async () => {
	const { getByTestId } = render(InputModal);

	const button = getByTestId('floating-add-button');
	expect(button).toBeInTheDocument();
});

test('should open modal when floating button is clicked', async () => {
	const { getByTestId, queryByTestId } = render(InputModal);

	const button = getByTestId('floating-add-button');
	await fireEvent.click(button);

	const modal = queryByTestId('modal');
	expect(modal).toBeInTheDocument();
});

test('should close modal when modal is clicked', async () => {
	const { getByTestId } = render(InputModal);
	console.log(document.body.innerHTML);

	const button = getByTestId('floating-add-button');
	expect(button).toBeInTheDocument();

	await fireEvent.click(button);

	const modal = getByTestId('modal');
	await waitFor(() => expect(modal).toBeInTheDocument());

	await tick();
	await waitFor(() => fireEvent.click(modal));
	console.log(document.body.innerHTML);
	expect(modal).not.toBeInTheDocument();
});
