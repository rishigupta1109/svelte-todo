import { descriptionLength, titleLength } from '$lib/utils/constants';
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
			func: (value: any, length: number | undefined) => boolean;
			length?: number;
			message: string;
		}[] = [
			{ value: id, func: isValidId, message: 'Invalid id in ToDoItem' },
			{
				value: title,
				func: isValidString,
				length: titleLength,
				message: 'Invalid title in ToDoItem'
			},
			{
				value: description,
				func: isValidString,
				length: descriptionLength,
				message: 'Invalid description in ToDoItem'
			},
			{ value: userId, func: isValidString, message: 'Invalid userId in ToDoItem' },
			{ value: dateDue, func: isValidDueDate, message: 'Invalid dateDue in ToDoItem' }
		];

		for (const validation of validations) {
			if (!validation.func(validation?.value, validation?.length)) {
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
	setDateCompleted(dateCompleted: Date | null): void {
		this.dateCompleted = dateCompleted;
	}
	setDateDue(dateDue: Date): void {
		this.dateDue = dateDue;
	}
	setUserId(userId: string): void {
		this.userId = userId;
	}
	setDateCreated(dateCreated: Date): void {
		this.dateCreated = dateCreated;
	}
	static from({
		id,
		title,
		description,
		completed,
		dateCreated,
		dateCompleted,
		dateDue,
		userId
	}: {
		id: string;
		title: string;
		description: string;
		completed: boolean;
		dateCreated: Date;
		dateCompleted: Date | null;
		dateDue: Date;
		userId: string;
	}): ToDoItem {
		console.log(id, title, description, completed, dateCreated, dateCompleted, dateDue, userId);
		let item = new ToDoItem(id, title, description, userId, dateDue);
		item.setCompleted(completed);
		item.setDateCompleted(dateCompleted ? new Date(dateCompleted) : null);
		item.setDateCreated(new Date(dateCreated));
		return item;
	}
}
