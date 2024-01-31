import { test, vi } from 'vitest';
import Page from './+page.svelte';
import { fireEvent, render } from '@testing-library/svelte';

test('should render page', () => {
	const { getByText } = render(Page);
	expect(getByText('Welcome to Nuclei`s Own ToDo App')).toBeInTheDocument();
});

test('should render login button', () => {
	const { getByText } = render(Page);
	expect(getByText('Sign up with Google')).toBeInTheDocument();
});

test('should login with google', async () => {
	const { getByText } = render(Page);
	expect(getByText('Sign up with Google')).toBeInTheDocument();
	let fn = vi.fn();
	getByText('Sign up with Google').onclick = fn;
	await fireEvent.click(getByText('Sign up with Google'));
	expect(fn).toHaveBeenCalled();
});
