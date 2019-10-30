import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Router } from 'react-router';
import { Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Footer from '../../components/Footer/Footer';
import Menu from '../../components/Menu/Menu';
import { LoginInterface, ProviderInterface, RegisterInterface } from '../../interfaces/commonInterfaces';
import { RootReducerInterface } from '../../interfaces/reducersInterface';
import { history } from '../../main/history';
import Provider from '../../models/Provider';
import { loggedIn, loggedOut } from '../../redux/actionCreators/userActions';
import { handleLoginError } from '../../utils/errors';
import { axiosInstance } from '../../utils/httpClient';
import LoginModal from '../Modal/LoginModal';
import ProviderModal from '../Modal/ProviderModal';
import RegisterModal from '../Modal/RegisterModal';
import ApplicationRouter from './ApplicationRouter';

class MainRouter extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			openLogin: false,
			openRegister: false,
			openProviderRegister: false,
			loading: false,
			loginErrors: {}
		}
	}
	handleRegister = async (registerData: RegisterInterface) => {
		const { loggedIn } = this.props
		try {
			this.setState({ loading: true })
			const request = await axiosInstance.post('user', registerData)
			const user = request.data.data
			loggedIn(user)
			await this.handleModalFinish()
		} catch (e) {
			console.error(e.response.data.data.error)
		}
	}

	handleProviderRegister = async (providerData: ProviderInterface) => {
		const { loggedIn, user } = this.props
		const provider = new Provider()
		const sendObj = {
			...providerData,
			provider
		}
		try {
			this.setState({ loading: true })
			const request = await axiosInstance.put(`user/${user.id}`, sendObj)
			const userResponse = request.data.data
			loggedIn(userResponse)
			await this.handleModalFinish()
		} catch (e) {
			console.error(e.response.data.data.error)
		}
	}

	handleModalFinish = async () => {
		const overlay = document.getElementsByClassName('modal-overlay')[0]
		if (overlay) {
			overlay.parentNode.removeChild(overlay)
		}
		this.setState({
			loading: false,
			openLogin: false,
			openRegister: false,
			openProviderRegister: false
		})
	}

	handleLogin = async (loginData: LoginInterface) => {
		const { loggedIn } = this.props
		try {
			this.setState({ loading: true })
			const request = await axiosInstance.post('login', loginData)
			const user = request.data.data
			loggedIn(user)
			this.handleModalFinish()
		} catch (e) {
			const errStr = e.response.data && e.response.data.data.error || e.response.data.error || 'erro'
			this.setState({
				loading: false,
				loginErrors: handleLoginError(errStr)
			})
		}
	}
	handleOpenRegister = () => {
		this.setState({
			openRegister: true
		})
	}
	handleOpenLogin = () => {
		this.setState({
			openLogin: true
		})
	}
	handleOpenProvider = () => {
		this.setState({
			openProviderRegister: true
		})
	}

	handleLogout = () => {
		const { loggedOut } = this.props
		try {
			this.setState({ loading: true })
			loggedOut()
		} catch (e) {
			console.error(e)
			this.handleModalFinish()
		} finally {
			this.handleModalFinish()
		}
	}
	render() {
		const { openLogin, openRegister, loading, loginErrors, openProviderRegister } = this.state
		const { token, provider } = this.props.user

		return (
			<Router history={history}>
				<div style={{ height: '100%' }}>
					{openRegister && (
						<RegisterModal
							loading={loading}
							modalClose={this.handleModalFinish}
							open={openRegister}
							onRegisterClick={this.handleRegister}
						/>
					)}
					{openLogin && (
						<LoginModal
							loading={loading}
							modalClose={this.handleModalFinish}
							open={openLogin}
							errors={loginErrors}
							onLoginClick={this.handleLogin}
						/>
					)}
					{ openProviderRegister && (
						<ProviderModal
							loading={loading}
							modalClose={this.handleModalFinish}
							open={openProviderRegister}
							// errors={loginErrors}
							onProviderRegisterClick={this.handleProviderRegister}
						/>
					)}
					<Menu
						openRegister={this.handleOpenRegister}
						openLogin={this.handleOpenLogin}
						openProvider={this.handleOpenProvider}
						user={this.props.user}
						logout={this.handleLogout}
					/>
					<Switch>
						<Route
							path='/'
							render={() => <ApplicationRouter user={this.props.user} />}
						/>
						<Route
							exact={true}
							path='/login'
							render={() => (!token ? null : <Redirect to='/' />)}
						/>
						<Route
							path='/'
							render={() =>
								token ? (
									<ApplicationRouter user={this.props.user} />
								) : null
							}
						/>
					</Switch>
					<Footer />
				</div>
			</Router>
		)
	}
}

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			loggedIn,
			loggedOut
		},
		dispatch
	)
const mapStateToProps = (state: RootReducerInterface) => ({
	user: state.user
})

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MainRouter)

interface OwnState {
	openLogin: boolean
	openRegister: boolean
	openProviderRegister: boolean
	loading: boolean
	loginErrors: {
		email?: string
		password?: string
	}
}

interface OwnProps {
	loadingStatus: boolean
	user: RootReducerInterface['user']
}

interface StateProps {
	user: RootReducerInterface['user']
}

interface DispatchProps {
	loggedIn: (...args: any) => any
	loggedOut: (...args: any) => any
}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState
