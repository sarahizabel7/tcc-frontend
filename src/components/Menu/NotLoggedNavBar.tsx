import * as React from 'react'

export default (props: OwnProps) => (
	<React.Fragment>
		<li>
			<a className='grey-text text-darken-3' onClick={props.openRegister}>
				Cadastrar-se
			</a>
		</li>
		<li>
			<a className='grey-text text-darken-3' onClick={props.openLogin}>
				Entrar
			</a>
		</li>
	</React.Fragment>
)

interface OwnProps {
	openRegister: () => void
	openLogin: () => void
}
