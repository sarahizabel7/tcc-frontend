import * as React from 'react'
import { Button, Row, Col, TextInput, Icon } from 'react-materialize'
import Input from '../../components/Input/Input'

export default () => (
	<div>
		<h5 style={{ marginBottom: '30px' }}>Meus dados</h5>

		<h6 style={{ marginBottom: '20px' }}>Dados da conta</h6>

		<Row>
			<form>
				<Input
					type='email'
					label='Email'
					value='matheusg93@gmail.com'
					s='12'
					m='6'
				/>
				<Input
					type='password'
					label='Senha'
					value='*********'
					s='12'
					m='6'
				/>
			</form>
		</Row>

		<h6 style={{ marginBottom: '10px' }}>Dados pessoais</h6>

		<Row>
			<form>
				<Input s='12' m='6' label='Nome' value='Matheus' />
				<TextInput s={12} m={6} label='Sobrenome' value='Gentil' />
			</form>
		</Row>

		<Button type='submit' className='indigo' waves='light'>
			Salvar
		</Button>
	</div>
)
