import { createHashHistory } from 'history'

export const history = createHashHistory({
	basename: ''
})
export const location = history.location
