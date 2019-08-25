import * as React from 'react'
import { Redirect, Route, Router } from 'react-router'
import { Switch } from 'react-router-dom'
import { history } from '../../main/history'
import Settings from '../../pages/Settings/MainSettings'
import MainPage from '../../pages/MainPage'

export default (props: Props) => {
	const { token } = props
	return (
		<Switch>
			<Route path='/' exact={true} render={() => <MainPage />} />
			{token && <Route path='/settings' render={() => <Settings />} />}
		</Switch>
	)
}

interface Props {
	token: string
}
