export class ToDoItem {
	private id: string;
	private title: string;
	private description: string;
	private completed: boolean;
	private dateCreated: Date;
	private dateCompleted: Date | null;
	private dateDue: Date | null;
	private userId: string;
	constructor(id: string, title: string, description: string, userId: string) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.completed = false;
		this.dateCreated = new Date();
		this.dateCompleted = null;
		this.dateDue = null;
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
	getDateDue(): Date | null {
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
