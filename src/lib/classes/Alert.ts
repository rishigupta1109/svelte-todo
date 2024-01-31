import { generateRandomId } from '$lib/utils/utils';

export class Alert {
	private message: string;
	private type: 'success' | 'error' | 'warning' | 'info';
	private id: string;
	constructor(message: string, type: 'success' | 'error' | 'warning' | 'info') {
		if (!message) throw new Error('Message is required');
		if (!type) throw new Error('Type is required');
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
	public setMessage(message: string): void {
		this.message = message;
	}
	public setType(type: 'success' | 'error' | 'warning' | 'info'): void {
		this.type = type;
	}
}
