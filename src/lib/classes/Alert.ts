import { generateRandomId } from '$lib/utils/utils';

export class Alert {
	private message: string;
	private type: 'success' | 'error' | 'warning' | 'info';
	private id: string;
	constructor(message: string, type: 'success' | 'error' | 'warning' | 'info') {
		this.message = message;
		this.type = type;
		this.id = generateRandomId('alert');
	}
	public getId(): string {
		return this.id;
	}
	public getMessage(): string {
		return this.message;
	}
	public getType(): 'success' | 'error' | 'warning' | 'info' {
		return this.type;
	}
}
