import * as React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import Account from '../../containers/AccountContainer';
import Services from '../../containers/ServicesContainer';
import Messages from '../../pages/Settings/Messages';
import Resume from '../../pages/Settings/Resume';

export default () => (
	<Switch>
		<Route path='/settings/resume' render={() => <Resume />} />
		<Route path='/settings/services' render={() => <Services />} />
		<Route path='/settings/account' render={() => <Account />} />
		<Route path='/settings/messages' render={() => <Messages />} />
	</Switch>
)
