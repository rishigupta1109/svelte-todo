import { render } from '@testing-library/svelte';
import Logo from '../Logo.svelte';

test('should render logo and text correctly', async () => {
	const { getByAltText, getByText } = render(Logo);

	const logo = getByAltText('logo');
	expect(logo).toBeInTheDocument();
	expect(logo.src).toContain('/N.svg');

	const text = getByText('| To Do App');
	expect(text).toBeInTheDocument();
});
