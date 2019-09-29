export interface RegisterInterface {
	name: string,
	lastname: string,
	password: string,
	email: string,
}

export interface LoginInterface {
	email: string,
	password: string
}

export enum Gender {
	male,
	female
}

export interface ProviderInterface {
	cpf: string,
	gender: Gender,
	phone: string
}