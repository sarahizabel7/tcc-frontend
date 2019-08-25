import * as React from 'react'
import { Modal, Button, TextInput, Row, Col } from 'react-materialize'
import { PulseLoader } from 'react-spinners'
import { useInput } from '../../hooks/Form'
import { LoginInterface } from '../../interfaces/commonInterfaces'
import { isEmail } from '../../utils/regex'
import Input from '../../components/Input/Input'

export default (props: OwnProps) => {
	const email = useInput('')
	const password = useInput('')
	React.useEffect(() => {
		if (props.errors.email) {
			email.setError(props.errors.email)
		}
		if (props.errors.password) {
			email.setError(props.errors.email)
		}
	}, [props.errors])
	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const a = hasError()
		if (!a) {
			const data = {
				email: email.value,
				password: password.value
			}
			props.onLoginClick(data)
		}
	}

	const hasError = () => {
		let emailError,
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
		return Boolean(emailError) || Boolean(passError)
	}
	return (
		<Modal
			open={props.open}
			actions={<div />}
			className={'login-modal mini no-footer'}
			header={'Login'}
			options={{
				onCloseEnd: props.modalClose,
				preventScrolling: true
			}}
		>
			<Row>
				<form onSubmit={handleLogin}>
					<Input
						label='email'
						{...email}
						s='12'
						m='12'
						error={email.error}
					/>
					<Input
						s='12'
						m='12'
						label='Senha'
						type='password'
						{...password}
						error={password.error}
					/>
					{!props.loading ? (
						<Button className={'fluid indigo'} s={12}>
							Login
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
	modalClose: () => void
	onLoginClick: (loginData: LoginInterface) => void
	loading: boolean
	errors: {
		email?: string
		password?: string
	}
}
