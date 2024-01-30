import { render, fireEvent } from '@testing-library/svelte';
import { get } from 'svelte/store';
import { userStore } from '../../../../store/userStore';
import Navbar from '../Navbar.svelte';
import { User } from '$lib/classes/User';
import { generateRandomId } from '$lib/utils/utils';
import { vi } from 'vitest';
import { firebaseStore } from '../../../../store/firebaseStore';
import Logo from '$lib/components/ui/Logo.svelte';

test('should render logo and not render logout button when user is not logged in', async () => {
	userStore.set(null);
	const { getByTestId, queryByText } = render(Navbar);
	const logo = getByTestId('logo-component');

	expect(logo).toBeInTheDocument();
	expect(queryByText('Logout')).not.toBeInTheDocument();
});

test('should render logout button when user is logged in', async () => {
	userStore.set(
		new User(
			generateRandomId('USER'),
			'TEST USER',
			'Test@gmmmail.com',
			new Date().toDateString(),
			'asdasd'
		)
	);
	const { getByText } = render(Navbar);

	expect(getByText('Logout')).toBeInTheDocument();
});

test('should call signOut when confirm action is triggered', async () => {
	userStore.set(
		new User(
			generateRandomId('USER'),
			'TEST USER',
			'Test@gmmmail.com',
			new Date().toDateString(),
			'asdasd'
		)
	);
	const signOutSpy = vi.spyOn(get(firebaseStore), 'signOut');
	const { getByText } = render(Navbar);

	await fireEvent.click(getByText('Logout'));
	await fireEvent.click(getByText('YES'));

	expect(signOutSpy).toHaveBeenCalled();
});
