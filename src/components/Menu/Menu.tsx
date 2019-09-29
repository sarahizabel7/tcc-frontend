import * as React from 'react'
import Navbar from './Navbar'
import SideNav from './Sidenav'
import { RootReducerInterface } from '../../interfaces/reducersInterface'

export default (props: OwnProps) => (
	<React.Fragment>
		<nav className='transparent'>
			{/* <div className='container'> */}
			<div className='nav-wrapper'>
				<SideNav
					user={props.user}
					openRegister={props.openRegister}
					openLogin={props.openLogin}
					logout={props.logout}
				/>
				<Navbar
					openRegister={props.openRegister}
					openLogin={props.openLogin}
					openProvider={props.openProvider}
					user={props.user}
					logout={props.logout}
				/>
			</div>
			{/* </div> */}
		</nav>
	</React.Fragment>
)

interface OwnProps {
	openRegister: () => void
	openLogin: () => void
	openProvider: () => void
	user: RootReducerInterface['user']
	logout: () => void
}
