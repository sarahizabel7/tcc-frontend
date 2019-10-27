import * as React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import MainPage from '../../pages/MainPage';
import Search from '../../pages/SearchPage';
import Settings from '../../pages/Settings/MainSettings';

export default (props: Props) => {
	const { token } = props
	return (
		<Switch>
			<Route path='/' exact={true} render={() => <MainPage />} />
			{token && <Route path='/settings' render={() => <Settings />} />}
			{token && <Route path='/search/:search' render={({match}) => <Search searchedText={match.params.search}/>} />}
		</Switch>
	)
}

interface Props {
	token: string
}
