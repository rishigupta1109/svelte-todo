import { render } from '@testing-library/svelte';
import Layout from './+layout.svelte';

test('should render navbar and footer', () => {
	const { getByTestId } = render(Layout);
	expect(getByTestId('navbar')).toBeInTheDocument();
	expect(getByTestId('footer')).toBeInTheDocument();
});
