import { render, fireEvent } from '@testing-library/svelte';
import ConfirmAction from '../ConfirmAction.svelte';
import { vi } from 'vitest';

test('should render modal when open is true', async () => {
	const { getByText } = render(ConfirmAction, { props: { open: true } });

	expect(getByText('Are you sure?')).toBeInTheDocument();
	expect(getByText('YES')).toBeInTheDocument();
	expect(getByText('NO')).toBeInTheDocument();
});

test('should not render modal when open is false', async () => {
	const { queryByText } = render(ConfirmAction, { props: { open: false } });

	expect(queryByText('Are you sure?')).not.toBeInTheDocument();
	expect(queryByText('YES')).not.toBeInTheDocument();
	expect(queryByText('NO')).not.toBeInTheDocument();
});

test('should call confirm function when YES button is clicked', async () => {
	const confirm = vi.fn();
	const { getByText } = render(ConfirmAction, { props: { open: true } });

	const yesButton = getByText('YES');
	yesButton.addEventListener('click', confirm);
	await fireEvent.click(yesButton);

	expect(confirm).toHaveBeenCalled();
});

test('should call cancel function when NO button is clicked', async () => {
	const cancel = vi.fn();
	const { getByText } = render(ConfirmAction, { props: { open: true } });

	const noButton = getByText('NO');
	noButton.addEventListener('click', cancel);
	await fireEvent.click(noButton);

	expect(cancel).toHaveBeenCalled();
});
