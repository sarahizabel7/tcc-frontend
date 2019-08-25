export function handleLoginError(err: string) {
	switch (err) {
		case 'Incorrect password.':
			return {
				email: 'Dados inválidos',
				password: 'Dados inválidos'
			}
		case 'Incorrect username.':
			return {
				email: 'Usuário Não existe'
			}
		default:
			return {
				email: 'Erro no servidor'
			}
	}
}
