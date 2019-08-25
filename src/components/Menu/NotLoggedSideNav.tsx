import * as React from 'react'

export default (props: OwnProps) => (
	<React.Fragment>
		<li>
			<a href='index.html'>
				<i className='fa fa-home grey-text text-darken-4' /> Home
			</a>
		</li>
		<li>
			<div className='divider' />
		</li>
		<li>
			<a className='btn teal lighten-1' onClick={props.openRegister}>
				Registrar-se
			</a>
		</li>
		<li>
			<a onClick={props.openLogin} className='btn teal lighten-1'>
				Login
			</a>
		</li>
	</React.Fragment>
)

interface OwnProps {
	openRegister: () => void
	openLogin: () => void
	logout: () => void
}
