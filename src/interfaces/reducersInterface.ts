import Provider from "../models/Provider";

export interface RootReducerInterface {
	user: UserReducer
}

export interface UserReducer {
	token: string
	email: string
	id: string
	name?: string
	lastname?: string
	loading?: boolean
	avatar?: string
	provider?: Provider
	isProvider?: boolean
}

export interface Action {
	type: string
}
