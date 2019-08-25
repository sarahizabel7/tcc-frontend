import * as React from 'react'
const logo = require('../../../public/assets/images/logo_noname_transparent2.png')
import { toPathOnClick } from '../../utils/utils'

export default () => (
	<React.Fragment>
		<a
			onClick={toPathOnClick('/')}
			style={aStyle}
			className='brand-logo indigo-text'
		>
			<img style={imgStyle} src={logo} />
			<span style={spanStyle}> bazzu</span>
		</a>
	</React.Fragment>
)

const aStyle = {
	display: 'inline-flex',
	verticalAlign: 'inline-flex'
}
const spanStyle = {
	marginLeft: '8px'
}

const imgStyle = {
	margin: 'auto',
	height: '50px'
}
