import { UserReducer, Action } from '../../interfaces/reducersInterface'

const INITIAL_STATE: UserReducer = {
	email: '',
	name: '',
	lastname: '',
	loading: false,
	avatar: null,
	id: '',
	isProvider: false,
	token: ''
}

export default (state = INITIAL_STATE, action: UserActions) => {
	switch (action.type) {
		case 'USER_LOGGED_IN':
			return { ...state, ...action.payload }
		case 'USER_LOGGED_OUT':
			return { ...INITIAL_STATE }
		case 'SET_LOADING_STATE':
			return { ...state, loading: true }
		case 'USER_UPDATED':
			return { ...state, ...action.payload, loading: false }
		default:
			return state
	}
}

type UserActions = LoggedIn | LoggedOut | LoadingState | UserUpdate

interface LoggedIn extends Action {
	type: 'USER_LOGGED_IN'
	payload: UserReducer
}

interface UserUpdate extends Action {
	type: 'USER_UPDATED'
	payload: UserReducer
}

interface LoggedOut extends Action {
	type: 'USER_LOGGED_OUT'
}

interface LoadingState extends Action {
	type: 'SET_LOADING_STATE'
}
