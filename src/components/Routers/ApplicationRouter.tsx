import * as React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import { RootReducerInterface } from '../../interfaces/reducersInterface';
import MainPage from '../../pages/MainPage';
import Search from '../../pages/SearchPage';
import Settings from '../../pages/Settings/MainSettings';

const ApplicationRouter = (props: Props) => {
	const { token, provider } = props.user
	return (
		<Switch>
			<Route path='/' exact={true} render={() => <MainPage />} />
			{token && <Route path='/settings' render={() => <Settings user={props.user}/>} />}
			<Route path='/search/:search' render={({match}) => <Search searchedText={match.params.search}/>} />
			<Route path='/search/' render={({match}) => <Search searchedText={match.params.search}/>} />
		</Switch>
	)
}

interface Props {
	user: RootReducerInterface['user']
}

export default ApplicationRouter