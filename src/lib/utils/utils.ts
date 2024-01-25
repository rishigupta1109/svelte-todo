export function getRandomChar(length: number): string {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i: number = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
export function getTimeInLocaleString(): string {
	return new Date().getTime().toString();
}
export function generateRandomId(prefix: string = 'TODO'): string {
	return prefix + getRandomChar(2) + getTimeInLocaleString();
}
export function isValidString(str: string): boolean {
	return str.trim().length > 0;
}
export function isValidDueDate(date: Date): boolean {
	console.log(date);
	return date instanceof Date && !isNaN(date.getTime()) && date.getTime() > Date.now();
}
export function isValidId(id: string): boolean {
	console.log(id);
	return new RegExp(/^TODO[A-Za-z0-9]*$/).test(id);
}
export function getRemainingDays(date: Date) {
	if (!date) return;
	if (date.getTime() < Date.now()) return 'Overdue';
	const diff = Math.abs(date.getTime() - Date.now());
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	return `${days} days remaining`;
}
