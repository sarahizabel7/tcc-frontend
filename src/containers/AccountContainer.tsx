import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RootReducerInterface } from '../interfaces/reducersInterface'
import Account from '../pages/Settings/FunctionAccount'
import { updateUser } from '../redux/actionCreators/userActions'
import { axiosInstance } from '../utils/httpClient'

class AccountContainer extends React.Component<Props, State> {
	state = {
		user: {
			...this.props.user
		},
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
			user: { ...this.state.user, [e.target.name]: e.target.value }
		})
	}
	handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			this.setLoading(true)
			const { name, lastname, email } = this.state.user
			let request = await axiosInstance.put(
				`/user/${this.state.user.id}`,
				{
					name,
					lastname,
					email
				}
			)
			this.props.updateUser(request.data.data)
		} catch (e) {
			this.handleError(e.response.data.data.error)
		} finally {
			this.setLoading(false)
		}
	}

	setLoading = (isLoading: boolean) => {
		this.setState({
			...this.state,
			loading: isLoading
		})
	}

	handleError = (e: any) => {
		switch (e) {
			case 'User not found.':
				this.setState({
					...this.state,
					errors: {
						...this.state.errors,
						email: 'Este email já existe.'
					}
				})
		}
	}

	render() {
		const { errors, user, loading } = this.state
		return (
			<Account
				user={user}
				handleChange={this.handleChange}
				handleUpdate={this.handleUpdate}
				loading={loading}
				errors={errors}
			/>
		)
	}
}

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators({ updateUser }, dispatch)
const mapStateToProps = (state: RootReducerInterface) => ({
	user: state.user
})

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AccountContainer)

interface OwnState {
	loading: boolean
	errors: {
		email: string
	}
	user: RootReducerInterface['user']
}

interface OwnProps {}

interface StateProps {
	user: RootReducerInterface['user']
}

interface DispatchProps {
	updateUser: any
}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState
