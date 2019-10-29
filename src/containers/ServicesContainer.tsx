import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ProvidedService } from '../interfaces/commonInterfaces';
import { RootReducerInterface } from '../interfaces/reducersInterface';
import Services from '../pages/Settings/Services';
import { updateUser } from '../redux/actionCreators/userActions';


class ServicesContainer extends React.Component<Props, State> { 
	state: State = {
		user: {
			...this.props.user
		},
		loading: false,
	}

	setLoading = (isLoading: boolean) => {
		this.setState({
			...this.state,
			loading: isLoading
		})
	}

	handleServicesUpdate = (providedServices: ProvidedService[]) => {
		console.log('handledProvidedServices', providedServices)
	}

	render() {
		const { user, loading } = this.state
		return (
			<Services
				user={user}
				loading={loading}
				handleServicesUpdate={this.handleServicesUpdate}
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
)(ServicesContainer)

interface OwnState {
	loading: boolean
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
