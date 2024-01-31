import { render } from '@testing-library/svelte';
import { ToDoItem } from '$lib/classes/ToDoItem';
import ListWrapper from '../ListWrapper.svelte';
import { generateRandomId } from '$lib/utils/utils';

test('should render title correctly', async () => {
	const { getByText } = render(ListWrapper, { props: { title: 'Test Title', list: [] } });

	expect(getByText('Test Title')).toBeInTheDocument();
});

test('should render "No Tasks" when list is empty', async () => {
	const { getByText } = render(ListWrapper, { props: { title: 'Test Title', list: [] } });

	expect(getByText('No Tasks!')).toBeInTheDocument();
});

test('should render ToDoList when list is not empty', async () => {
	const list: ToDoItem[] = [
		new ToDoItem(
			generateRandomId('TODO'),
			'Test Title',
			'Test Desc',
			generateRandomId('USER'),
			new Date()
		),
		new ToDoItem(
			generateRandomId('TODO'),
			'Test Title2',
			'Test Desc2',
			generateRandomId('USER'),
			new Date()
		)
	];
	const { getByText } = render(ListWrapper, { props: { title: 'Test Tasks', list } });

	expect(getByText('Test Tasks')).toBeInTheDocument();
	expect(getByText('TEST TITLE')).toBeInTheDocument();
	expect(getByText('Test Desc')).toBeInTheDocument();
	expect(getByText('TEST TITLE2')).toBeInTheDocument();
	expect(getByText('Test Desc2')).toBeInTheDocument();
});
