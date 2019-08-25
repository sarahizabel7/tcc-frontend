import * as React from 'react'
import { Button, Row, Col, TextInput, Icon } from 'react-materialize'
import Input from '../../components/Input/Input'

import { axiosInstance } from '../../utils/httpClient'
import { PulseLoader } from 'react-spinners'

export default class AccountState extends React.Component<Props, State> {
	state: State = {
		name: '',
		lastname: '',
		password: '********',
		email: '',
		loading: false,
		errors: {
			email: '',
			name: '',
			lastname: ''
		}
	}
	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		})
	}
	async componentDidMount() {
		try {
			let request = await axiosInstance.get(
				'/user/5c965d1e0203772b687a7ecb'
			)
			const { email, lastname, name } = request.data.data
			this.setState({
				name,
				lastname,
				email
			})
		} catch (e) {
			console.error(e)
		}
	}
	handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			this.setLoading(true)
			const { name, lastname, email } = this.state
			let request = await axiosInstance.put(
				'/user/5c965d1e0203772b687a7ecb',
				{
					name,
					lastname,
					email
				}
			)
		} catch (e) {
			this.handleError(e)
		} finally {
			this.setLoading(false)
		}
	}
	setLoading = (isLoading: boolean) => {
		this.setState({
			loading: isLoading
		})
	}
	handleError = (e: any) => {
		console.log('handleErrrorr', e.response.data.data.error)
		switch (e.response.data.data.error) {
			case 'User not found.': {
				this.setState({
					...this.state,
					errors: {
						...this.state.errors,
						email: 'email não existe'
					}
				})
			}
		}
	}
	render() {
		const { name, lastname, password, email, loading, errors } = this.state
		return (
			<div>
				<h5 style={{ marginBottom: '30px' }}>Meus dados</h5>

				<h6 style={{ marginBottom: '20px' }}>Dados da conta</h6>
				<form onSubmit={this.handleUpdate}>
					<Row>
						<Input
							type='text'
							label='Email'
							name='email'
							onChange={this.handleChange}
							value={email}
							error={errors.email}
							autoComplete='off'
							s='12'
							m='6'
						/>
						{/* <Input
							type='password'
							label='Senha'
							onChange={this.handleChange}
							autoComplete='new-password'
							name='password'
							value={password}
							s='12'
							m='6'
						/> */}
					</Row>

					<h6 style={{ marginBottom: '10px' }}>Dados pessoais</h6>

					<Row>
						<Input
							s='12'
							m='6'
							error={errors.name}
							label='Nome'
							onChange={this.handleChange}
							value={name}
							name='name'
						/>
						<Input
							s='12'
							m='6'
							name='lastname'
							error={errors.lastname}
							label='Sobrenome'
							onChange={this.handleChange}
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
}

interface Props {}

interface State {
	name: string
	loading: boolean
	email: string
	password: string
	lastname: string
	errors: {
		email: string
		name: string
		lastname: string
	}
}
