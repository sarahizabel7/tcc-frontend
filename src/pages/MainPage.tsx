import * as React from 'react'

import Header from '../components/Header/Header'
import IconBox from '../components/IconBox/IconBox'

export default (props: OwnProps) => {
	return (
		<React.Fragment>
			<Header />
			<IconBox />
		</React.Fragment>
	)
}

interface OwnProps {}
