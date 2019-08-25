import { Dispatch } from 'redux'
import { history } from '../../main/history'
import { axiosInstance } from '../../utils/httpClient'
import { UserReducer } from '../../interfaces/reducersInterface'

export const loggedIn = async (user: UserReducer) => {
	return async (dispatch: Dispatch<any>) => {
		localStorage.setItem('user', JSON.stringify(user))
		axiosInstance.defaults.headers.common['Authorization'] = `Token ${
			user.token
		}`
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
			const logout = await axiosInstance.post('logout')
		} catch (e) {
			console.log(e)
		} finally {
			localStorage.removeItem('user')
			delete (axiosInstance as any).defaults.headers.common[
				'Authorization'
			]
			dispatch({
				type: 'USER_LOGGED_OUT'
			})
			goToMain()
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
