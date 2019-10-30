import { Dispatch } from 'redux';

import { UserReducer } from '../../interfaces/reducersInterface';
import { history } from '../../main/history';
import { axiosInstance } from '../../utils/httpClient';

export const loggedIn = async (user: UserReducer) => {
	return async (dispatch: Dispatch<any>) => {
		localStorage.setItem('user', JSON.stringify(user))
		Object.assign(axiosInstance.defaults, {headers: {Authorization: user.token}});

		dispatch({
			type: 'USER_LOGGED_IN',
			payload: user
		})
	}
}

export const loggedOut = () => {
	return async (dispatch: Dispatch<any>) => {
		try {
			dispatch({
				type: 'SET_LOADING_STATE'
			})
			localStorage.removeItem('user')
			Object.assign(axiosInstance.defaults, {});
			dispatch({
				type: 'USER_LOGGED_OUT'
			})
			goToMain()
			await axiosInstance.post('logout')
		} catch (e) {
			console.error(e)
		}
	}
}

export const updateUser = (user: UserReducer) => {
	return async (dispatch: Dispatch<any>, getState: any) => {
		dispatch({
			type: 'USER_UPDATED',
			payload: user
		})
	}
}

export const goToMain = () => {
	return history.push('/')
}

export const goToLogin = () => {
	return history.push('/login')
}
