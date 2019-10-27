import * as React from 'react';
import { Button, Col, Row } from 'react-materialize';
import { PulseLoader } from 'react-spinners';

import Input from '../../components/Input/Input';
import { RootReducerInterface } from '../../interfaces/reducersInterface';
import { toBase64 } from '../../utils/utils';

const LZUTF8 = require('lzutf8');

const imgStyle: React.CSSProperties = {
	width: '180px',
	height: 'auto',
	marginRight: '1em'
}

const imgContainer: React.CSSProperties = {
	display: 'flex',
	alignItems: 'top',
	padding: '1em 0'
}

const FunctionAccount = (props: Props) => {
	const { errors, handleChange, loading, user, handleUpdate, handleAvatarChange } = props
	const { 
		email,
		name,
		lastname,
		avatar: userAvatar
	} = user

	console.log(user)
	
	const decompressedAvatar = userAvatar ? LZUTF8.decompress(userAvatar, {
		inputEncoding: 'Base64'
	}) : 'http://www.auctus.com.br/wp-content/uploads/2017/09/sem-imagem-avatar.png'
	const [avatar, setAvatar] = React.useState(decompressedAvatar)

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const imageUrl = ((event.target as any).files[0])
			const imageBase64 = await toBase64(imageUrl) as string
			const compressedAvatar = LZUTF8.compress(avatar, {
				outputEncoding: 'Base64'
			});
			setAvatar(imageBase64)
			handleAvatarChange(compressedAvatar)

		} catch(e) {
			console.error(e)
		}
	}	

	return (
		<div>
			<h5 style={{ marginBottom: '30px' }}>Meus dados</h5>
			<h6 style={{ marginBottom: '20px' }}>Dados da conta</h6>

			<div style={imgContainer}>
				<img style={imgStyle} src={avatar} />
				<div>
					<label htmlFor='selecao-arquivo' className='selectFile'>
						Alterar imagem
					</label>
					<input onChange={handleImageUpload} id='selecao-arquivo' type="file" name="pic" accept="image/*" style={{display: 'none'}}></input>
				</div>
				
			</div>

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
	handleAvatarChange: (avatar: string) => void
	user: RootReducerInterface['user']
	errors: {
		email: string
	}
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	loading?: boolean
}

export default FunctionAccount
