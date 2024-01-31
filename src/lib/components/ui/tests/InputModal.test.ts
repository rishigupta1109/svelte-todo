import { render, fireEvent } from '@testing-library/svelte';
import InputModal from '../InputModal.svelte';

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
	const { getByTestId, queryByTestId } = render(InputModal);

	const button = getByTestId('floating-add-button');
	await fireEvent.click(button);

	const modal = getByTestId('modal');
	await fireEvent.click(modal);

	const modalAfterClick = queryByTestId('modal');
	expect(modalAfterClick).not.toBeInTheDocument();
});
