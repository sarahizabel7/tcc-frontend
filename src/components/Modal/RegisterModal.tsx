import * as React from 'react';
import { Button, Col, Modal, Row } from 'react-materialize';
import { PulseLoader } from 'react-spinners';

import { useInput } from '../../hooks/Form';
import { RegisterInterface } from '../../interfaces/commonInterfaces';
import { isEmail } from '../../utils/regex';
import Input from '../Input/Input';

const btnStyle = {
	position: 'absolute',
	top: '25px',
	right: '25px'
}

const header = ({handleClose}: {handleClose: () => void}) => (
	<div>
		<h4>Registrar</h4>
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-end'
		}}>
			<Button flat onClick={handleClose} style={btnStyle} className='text-black close-button'>x</Button>
		</div>
	</div>
)

export default (props: OwnProps) => {
	const name = useInput('')
	const lastname = useInput('')
	const email = useInput('')
	const password = useInput('')
	const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (hasError()) return
		const data = {
			name: name.value,
			lastname: lastname.value,
			email: email.value,
			password: password.value
		}
		props.onRegisterClick(data)
	}
	const handleClose = () => {
		props.modalClose()
	}
	const hasError = () => {
		let emailError,
			lastnameError,
			nameError,
			passError = null
		if (!isEmail.test(email.value)) {
			emailError = 'Email inválido'
			email.setError(emailError)
		}
		if (!email.value) {
			emailError = 'Email é requerido'
			email.setError(emailError)
		}
		if (password.value.length < 8) {
			passError = 'Senha deve possuir no mínimo 8 caracters'
			password.setError(passError)
		}
		if (!name.value) {
			nameError = 'Nome é requerido'
			name.setError(nameError)
		}
		if (!lastname.value) {
			lastnameError = 'Sobrenome é requerido'
			lastname.setError(lastnameError)
		}
		return (
			Boolean(emailError) ||
			Boolean(passError) ||
			Boolean(lastnameError) ||
			Boolean(nameError)
		)
	}
	return (
		<Modal
			open={props.open}
			className={'register-modal mini no-footer'}
			header={header({handleClose})}
			options={{
				onCloseEnd: handleClose,
				preventScrolling: true
			}}
		>
			<Row>
				<form onSubmit={handleRegister}>
					<Input s='12' label='Nome' {...name} />
					<Input s='12' label='Sobrenome' {...lastname} />
					<Input s='12' label='Email' {...email} />
					<Input s='12' label='Criar uma senha' type='password' autoComplete='off' {...password} />
					{!props.loading ? (
						<Button className={'fluid indigo'} s={12}>
							registrar
						</Button>
					) : (
						<Col offset={'s4'} s={4}>
							<PulseLoader color='#3F51B5' loading={true} />
						</Col>
					)}
				</form>
			</Row>
		</Modal>
	)
}

interface OwnProps {
	open: boolean
	onRegisterClick: (registerInfo: RegisterInterface) => void
	modalClose: () => void
	loading: boolean
}
