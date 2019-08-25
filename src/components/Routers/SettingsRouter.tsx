import * as React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import Resume from '../../pages/Settings/Resume'
import Services from '../../pages/Settings/Services'
import Account from '../../containers/AccountContainer'
import Messages from '../../pages/Settings/Messages'

export default () => (
	<Switch>
		<Route path='/settings/resume' render={() => <Resume />} />
		<Route path='/settings/services' render={() => <Services />} />
		<Route path='/settings/account' render={() => <Account />} />
		<Route path='/settings/messages' render={() => <Messages />} />
	</Switch>
)
