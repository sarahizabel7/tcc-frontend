import * as React from 'react'
import { Modal, Button, Row, Col, Icon, RadioGroup } from 'react-materialize'
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
	const [gender, setGender] = React.useState(Gender.Male)
    
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
		if (phone.value.length > 12) {
			phoneError = 'Telefone inválido'
			phone.setError(phoneError)
		}
		if (!phone.value) {
			phoneError = 'Telefone é requerido'
			phone.setError(phoneError)
		}
		if (!cpf.value) {
			cpfError = 'Cpf é requerido'
			cpf.setError(cpfError)
		}
		if (cpf.value && cpf.value.length !== 14) {
			cpfError = 'Cpf inválido'
			cpf.setError(cpfError)
		}
		return (
			Boolean(phoneError) ||
			Boolean(cpfError)
		)
	}

	const onChangeGender = (event: React.ChangeEvent) => {
		setGender((event.target as any).value)
	}

	const genderOptions = [
		{label: 'Masculino', value: Gender.Male},
		{label: 'Feminino', value: Gender.Female}
	]

	const genderContainer: React.CSSProperties = {
		display: 'flex',
		marginBottom: '1em',
		alignItems: 'center',
		float: 'left',
		justifyContent: 'space-around',
		width: '100%'
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
					<Input s='12' maxLength={12} label='Telefone' {...phone} />
					<div style={genderContainer}>
						<label>Sexo:</label>
						<RadioGroup
							radioClassNames='genderRadios'
							name="size"
							withGap={true}
							value={gender}
							label="Sexo"
							onChange={onChangeGender}
							options={genderOptions}
						/>
					</div>
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
