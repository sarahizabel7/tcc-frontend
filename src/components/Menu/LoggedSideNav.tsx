import * as React from 'react'
import { SideNav, SideNavItem } from 'react-materialize'
import { RootReducerInterface } from '../../interfaces/reducersInterface'
const background = require('../../../public/assets/images/office.jpg')
const noUser = require('../../../public/assets/images/nouser.png')

export default (props: OwnProps) => (
	<React.Fragment>
		<SideNavItem
			userView
			user={{
				background,
				image: noUser,
				name: `${props.user.name} ${props.user.lastname}`,
				email: `${props.user.email}`
			}}
		/>
		<li>
			<a href='index.html'>
				<i className='fa fa-home grey-text text-darken-4' /> Home
			</a>
		</li>
		<li>
			<div className='divider' />
		</li>
		<li>
			<a onClick={props.logout} className='btn red lighten-1'>
				Logout
			</a>
		</li>
	</React.Fragment>
)

interface OwnProps {
	user: RootReducerInterface['user']
	logout: () => void
}
