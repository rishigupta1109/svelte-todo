import { render } from '@testing-library/svelte';
import Footer from '../Footer.svelte';

test('should render logo and copyright text correctly', async () => {
	const { getByText, getByTestId } = render(Footer);
	const logo = getByTestId('logo-component');

	expect(logo).toBeInTheDocument();
	expect(getByText('copyright © 2024')).toBeInTheDocument();
});
