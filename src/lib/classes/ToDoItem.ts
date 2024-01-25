import { isValidDueDate, isValidId, isValidString } from '$lib/utils/utils';

export class ToDoItem {
	private id: string;
	private title: string;
	private description: string;
	private completed: boolean;
	private dateCreated: Date;
	private dateCompleted: Date | null;
	private dateDue: Date;
	private userId: string;
	constructor(id: string, title: string, description: string, userId: string, dateDue: Date) {
		const validations: {
			value: string | Date;
			func: (value: any) => boolean;
			message: string;
		}[] = [
			{ value: id, func: isValidId, message: 'Invalid id in ToDoItem' },
			{ value: title, func: isValidString, message: 'Invalid title in ToDoItem' },
			{ value: description, func: isValidString, message: 'Invalid description in ToDoItem' },
			{ value: userId, func: isValidString, message: 'Invalid userId in ToDoItem' },
			{ value: dateDue, func: isValidDueDate, message: 'Invalid dateDue in ToDoItem' }
		];

		for (const validation of validations) {
			if (!validation.func(validation?.value)) {
				throw new Error(validation.message);
			}
		}
		this.id = id;
		this.title = title;
		this.description = description;
		this.completed = false;
		this.dateCreated = new Date();
		this.dateCompleted = null;
		this.dateDue = dateDue;
		this.userId = userId;
	}
	getId(): string {
		return this.id;
	}
	getTitle(): string {
		return this.title;
	}
	getDescription(): string {
		return this.description;
	}
	getCompleted(): boolean {
		return this.completed;
	}
	getDateCreated(): Date {
		return this.dateCreated;
	}
	getDateCompleted(): Date | null {
		return this.dateCompleted;
	}
	getDateDue(): Date {
		return this.dateDue;
	}
	getUserId(): string {
		return this.userId;
	}
	setId(id: string): void {
		this.id = id;
	}
	setTitle(title: string): void {
		this.title = title;
	}
	setDescription(description: string): void {
		this.description = description;
	}
	setCompleted(completed: boolean): void {
		this.completed = completed;
		this.dateCompleted = completed ? new Date() : null;
	}
	setDateCompleted(dateCompleted: Date): void {
		this.dateCompleted = dateCompleted;
	}
	setDateDue(dateDue: Date): void {
		this.dateDue = dateDue;
	}
	setUserId(userId: string): void {
		this.userId = userId;
	}
}
