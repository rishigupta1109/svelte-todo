import { isValidDateString, isValidEmail, isValidString } from '$lib/utils/utils';

export class User {
	private id: string;
	private name: string;
	private email: string;
	private dateCreated: Date;
	private token: string;
	constructor(id: string, name: string, email: string, dateCreated: string, token: string) {
		console.log(id, name, email, dateCreated, token);
		if (!User.areValidFields(id, name, email, dateCreated, token))
			throw new Error('Invalid fields');
		this.id = id;
		this.name = name;
		this.email = email;
		this.dateCreated = new Date(dateCreated);
		this.token = token;
	}
	static areValidFields(
		id: string,
		name: string,
		email: string,
		dateCreated: string,
		token: string
	): boolean {
		console.log(
			isValidString(id),
			isValidString(name),
			isValidEmail(email),
			isValidDateString(dateCreated),
			isValidString(token)
		);

		return (
			isValidString(id) &&
			isValidString(name) &&
			isValidEmail(email) &&
			isValidDateString(dateCreated) &&
			isValidString(token, 10000)
		);
	}
	getId(): string {
		return this.id;
	}
	getName(): string {
		return this.name;
	}
	getEmail(): string {
		return this.email;
	}
	getDateCreated(): Date {
		return this.dateCreated;
	}
	getToken(): string {
		return this.token;
	}
	setId(id: string): void {
		this.id = id;
	}

	setName(name: string): void {
		this.name = name;
	}
	setEmail(email: string): void {
		this.email = email;
	}
	setDateCreated(dateCreated: Date): void {
		this.dateCreated = dateCreated;
	}
	setToken(token: string): void {
		this.token = token;
	}
	static from({
		id,
		name,
		email,
		dateCreated,
		token
	}: {
		id: string;
		name: string;
		email: string;
		dateCreated: string;
		token: string;
	}): User {
		return new User(id, name, email, dateCreated, token);
	}
}
