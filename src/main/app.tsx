import * as React from 'react'
// ;(window as any).$ = (window as any).jQuery = require('materialize-css/node_modules/jquery/dist/jquery.js')

require('../../node_modules/@fortawesome/fontawesome-free/css/all.css')
// require('../../node_modules/@fortawesome/fontawesome-free/js/all')
require('../../node_modules/material-icons/css/material-icons.min.css')
require('../../node_modules/materialize-css/dist/css/materialize.min.css')
require('../../node_modules/materialize-css/dist/js/materialize.min.js')
require('./app.css')
import Router from '../components/Routers/MainRouter'
import { RootReducerInterface } from '../interfaces/reducersInterface'
import { bindActionCreators } from 'redux'
import { loggedIn } from '../redux/actionCreators/userActions'
import { connect } from 'react-redux'

class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { user: null, loadingStatus: false }
	}
	componentDidMount() {
		const { loggedIn } = this.props
		const savedUser = JSON.parse(localStorage.getItem('user'))
		if (savedUser && savedUser.token) {
			this.setState(
				{
					user: savedUser
				},
				() => loggedIn(savedUser)
			)
		} else {
			this.setState({
				user: null
			})
		}
	}

	render() {
		return (
			<Router
				user={this.state.user}
				loadingStatus={this.state.loadingStatus}
			/>
		)
	}
	componentWillReceiveProps(props: Props) {
		this.setState({
			user: props.user,
			loadingStatus: props.loadingStatus
		})
	}
}

const mapStateToProps = (state: RootReducerInterface) => ({
	user: state.user,
	loadingStatus: state.user.loading
})
const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators({ loggedIn }, dispatch)
export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(App)

/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {
	user: RootReducerInterface['user']
	loadingStatus: boolean
}

interface OwnProps {}

interface StateProps {
	user: RootReducerInterface['user']
	loadingStatus: RootReducerInterface['user']['loading']
}

interface DispatchProps {
	loggedIn: (...args: any) => void
}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState
