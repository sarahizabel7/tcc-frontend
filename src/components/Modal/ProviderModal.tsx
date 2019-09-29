import * as React from 'react'
import { Modal, Button, Row, Col, Icon } from 'react-materialize'
import { PulseLoader } from 'react-spinners'
import { useInput, useCpf } from '../../hooks/Form'
import { ProviderInterface, Gender } from '../../interfaces/commonInterfaces'

import Input from '../Input/Input'

const btnStyle = {
	position: 'absolute',
	top: '25px',
	right: '25px'
}

const header = ({handleClose}: {handleClose: () => void}) => (
	<div>
		<h4>Tornar-se Prestador</h4>
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
	const cpf = useCpf('')
	const phone = useInput('')
	const [gender, setGender] = React.useState(Gender.male)
    
	const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (hasError()) return
		const data = {
			cpf: cpf.value,
			gender,
			phone: phone.value,
		}
		props.onProviderRegisterClick(data)
	}
	const handleClose = () => {
		props.modalClose()
	}
	const hasError = () => {
		let phoneError,
			cpfError
			
		if (phone.value.length < 10) {
			phoneError = 'Telefone inválido'
			phone.setError(phoneError)
		}
		if (!cpf.value) {
			cpfError = 'Cpf é requerido'
			cpf.setError(cpfError)
		}
		return (
			Boolean(phoneError) ||
			Boolean(cpfError)
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
					<Input s='12' label='CPF' {...cpf} />
					<Input s='12' label='Telefone' {...phone} />
					{/* <Input s='12' label='Sexo' {...gender} /> */}
					{!props.loading ? (
						<Button className={'fluid indigo'} s={12}>
							Virar Prestador de serviços!
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
	onProviderRegisterClick: (providerInfo: ProviderInterface) => void
	modalClose: () => void
	loading: boolean
}
