import * as React from 'react'
import { Modal, Button, Row, Col, Icon } from 'react-materialize'
import { PulseLoader } from 'react-spinners'
import { useInput } from '../../hooks/Form'
import { RegisterInterface } from '../../interfaces/commonInterfaces'
import { isEmail } from '../../utils/regex'

import Input from '../Input/Input'

const header = () => (
	<div className='row'>
		<div className='col s11'>this</div>
		<div className='col s1 pull-s11'>X</div>
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
			header={header()}
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
					<Input s='12' label='Criar uma senha' {...password} />
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
