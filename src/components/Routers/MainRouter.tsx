import * as React from 'react'
import { Route, Router, Redirect } from 'react-router'
import { Switch } from 'react-router-dom'
import { history } from '../../main/history'
import { bindActionCreators } from 'redux'
import { loggedIn, loggedOut } from '../../redux/actionCreators/userActions'
import { connect } from 'react-redux'
import Menu from '../../components/Menu/Menu'
import Footer from '../../components/Footer/Footer'
import RegisterModal from '../Modal/RegisterModal'
import LoginModal from '../Modal/LoginModal'
import {
	RegisterInterface,
	LoginInterface
} from '../../interfaces/commonInterfaces'
import { axiosInstance } from '../../utils/httpClient'
import Profile from '../../pages/Settings/MainSettings'
import ApplicationRouter from './ApplicationRouter'
import { RootReducerInterface } from '../../interfaces/reducersInterface'
import { handleLoginError } from '../../utils/errors'

class MainRouter extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			openLogin: false,
			openRegister: false,
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
			console.log(e.response.data.data.error)
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
			openRegister: false
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
			const errStr = e.response.data.data.error
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
		const { openLogin, openRegister, loading, loginErrors } = this.state
		const { token } = this.props.user
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
					<Menu
						openRegister={this.handleOpenRegister}
						openLogin={this.handleOpenLogin}
						user={this.props.user}
						logout={this.handleLogout}
					/>
					<Switch>
						<Route
							path='/'
							render={() => <ApplicationRouter token={token} />}
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
									<ApplicationRouter token={token} />
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
	loading: boolean
	loginErrors: {
		email?: string
		password?: string
	}
}

interface OwnProps {
	loadingStatus: boolean
	user: any
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
