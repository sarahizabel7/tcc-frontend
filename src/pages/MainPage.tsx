import * as React from 'react'

import Header from '../components/Header/Header'
import Search from '../components/Search/Search'
import IconBox from '../components/IconBox/IconBox'
import ApplicationRouter from '../components/Routers/ApplicationRouter'

export default (props: OwnProps) => {
	return (
		<React.Fragment>
			<Header />
			<IconBox />
		</React.Fragment>
	)
}

interface OwnProps {}
