import { render } from '@testing-library/svelte';
import ToDoInput from '../ToDoInput.svelte';

it('Checking if inputs are present', () => {
	const { getByTestId } = render(ToDoInput, {
		props: {
			showModal: true
		}
	});
	const container = getByTestId('todo-input-container');
	const title = getByTestId('input-title');
	const description = getByTestId('input-description');
	const dueDate = getByTestId('input-due-date');
	const addBtn = getByTestId('add-button');

	expect(container).toBeInTheDocument();
	expect(container).toHaveTextContent(
		'Title : (Max. 25 chars) Description : (Max. 250 chars) Due Date : (Future date only) Add'
	);
	expect(title).toBeInTheDocument();
	expect(description).toBeInTheDocument();
	expect(dueDate).toBeInTheDocument();
	expect(addBtn).toBeInTheDocument();

	expect(title).toHaveAttribute('maxlength', '25');
	expect(description).toHaveAttribute('maxlength', '250');

	expect(title).toHaveValue('');
	expect(description).toHaveValue('');
	expect(dueDate).toHaveValue('');
});
