import * as React from 'react'
import { SideNav } from 'react-materialize'
import LoggedSideNav from './LoggedSideNav'
import NotLoggedSideNav from './NotLoggedSideNav'

export default (props: OwnProps) => (
	<SideNav
		options={{ closeOnClick: true }}
		trigger={
			<a href='#' className='grey-text'>
				<i className='hide-on-large-only fa fa-bars' />
			</a>
		}
	>
		{props.user.token && (
			<LoggedSideNav user={props.user} logout={props.logout} />
		)}
		{!props.user.token && <NotLoggedSideNav {...props} />}
	</SideNav>
)

interface OwnProps {
	openRegister: () => void
	openLogin: () => void
	user: any
	logout: () => void
}
