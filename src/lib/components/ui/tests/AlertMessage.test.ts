import { render, cleanup } from '@testing-library/svelte';
import { getBgColor } from '$lib/utils/utils';
import { alertStore } from '../../../../store/alertStore';
import AlertMessage from '../AlertMessage.svelte';
import { Alert } from '$lib/classes/Alert';

afterEach(cleanup);

test('should render alert messages', async () => {
	// Add alerts to the alertStore
	alertStore.add(new Alert('Test info message', 'info'));
	alertStore.add(new Alert('Test error message', 'error'));
	alertStore.add(new Alert('Test success message', 'success'));
	alertStore.add(new Alert('Test warning message', 'warning'));

	const { getByText } = render(AlertMessage);

	// Check if the alert messages are rendered
	expect(getByText('INFO : Test info message')).toBeInTheDocument();
	expect(getByText('ERROR : Test error message')).toBeInTheDocument();
	expect(getByText('SUCCESS : Test success message')).toBeInTheDocument();
	expect(getByText('WARNING : Test warning message')).toBeInTheDocument();
});

test('should apply correct background color for each alert type', async () => {
	// Add alerts to the alertStore
	let infoAlert = new Alert('Test info message', 'info');
	let errorAlert = new Alert('Test error message', 'error');
	let successAlert = new Alert('Test success message', 'success');
	let warningAlert = new Alert('Test warning message', 'warning');

	alertStore.add(infoAlert);
	alertStore.add(errorAlert);
	alertStore.add(successAlert);
	alertStore.add(warningAlert);

	const { getByTestId } = render(AlertMessage);

	// Check if the correct background color is applied for each alert type
	let infoAlertDiv = getByTestId('alert-' + infoAlert.getId());
	let errorAlertDiv = getByTestId('alert-' + errorAlert.getId());
	let successAlertDiv = getByTestId('alert-' + successAlert.getId());
	let warningAlertDiv = getByTestId('alert-' + warningAlert.getId());

	expect(infoAlertDiv).toHaveClass(
		`w-fit ${getBgColor(infoAlert.getType())} flex p-4 rounded-md text-white `
	);
	expect(errorAlertDiv).toHaveClass(
		`w-fit ${getBgColor(errorAlert.getType())} flex p-4 rounded-md text-white `
	);
	expect(successAlertDiv).toHaveClass(
		`w-fit ${getBgColor(successAlert.getType())} flex p-4 rounded-md text-white `
	);
	expect(warningAlertDiv).toHaveClass(
		`w-fit ${getBgColor(warningAlert.getType())} flex p-4 rounded-md text-white `
	);
});
