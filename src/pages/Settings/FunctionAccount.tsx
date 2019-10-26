import * as React from 'react'
import { Button, Row, Col } from 'react-materialize'
import Input from '../../components/Input/Input'
import { PulseLoader } from 'react-spinners'
import { RootReducerInterface } from '../../interfaces/reducersInterface'

export default (props: Props) => {
	const { errors, handleChange, loading, user, handleUpdate } = props
	const { email, name, lastname } = user
	return (
		<div>
			<h5 style={{ marginBottom: '30px' }}>Meus dados</h5>
			<h6 style={{ marginBottom: '20px' }}>Dados da conta</h6>
			<form onSubmit={handleUpdate}>
				<Row>
					<Input
						type='text'
						label='Email'
						name='email'
						onChange={handleChange}
						value={email}
						error={errors.email}
						autoComplete='off'
						s='12'
						m='6'
					/>
				</Row>

				<h6 style={{ marginBottom: '10px' }}>Dados pessoais</h6>

				<Row>
					<Input
						s='12'
						m='6'
						// error={errors.name}
						label='Nome'
						onChange={handleChange}
						value={name}
						name='name'
					/>
					<Input
						s='12'
						m='6'
						name='lastname'
						// error={errors.lastname}
						label='Sobrenome'
						onChange={handleChange}
						value={lastname}
					/>
				</Row>
				{!loading ? (
					<Button waves='light' className={'indigo'} s={12}>
						Salvar
					</Button>
				) : (
					<Col offset={'s4'} s={4}>
						<PulseLoader color='#3F51B5' loading={true} />
					</Col>
				)}
			</form>
		</div>
	)
}

interface Props {
	handleUpdate: (e: React.FormEvent<HTMLFormElement>) => void
	user: RootReducerInterface['user']
	errors: {
		email: string
	}
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	loading?: boolean
}
