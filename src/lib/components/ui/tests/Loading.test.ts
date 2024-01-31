import { render } from '@testing-library/svelte';
import { get } from 'svelte/store';
import { loadingStore } from '../../../../store/loadingStore';
import Loading from '../Loading.svelte';

test('should not render modal when loadingStore is false', async () => {
	loadingStore.set(false);
	const { queryByText } = render(Loading);

	expect(queryByText('Loading...')).not.toBeInTheDocument();
});

test('should render modal when loadingStore is true', async () => {
	loadingStore.set(true);
	const { getByText } = render(Loading);

	expect(getByText('Loading...')).toBeInTheDocument();
});
