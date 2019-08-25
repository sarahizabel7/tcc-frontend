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
	isProvider?: boolean
}

export interface Action {
	type: string
}
