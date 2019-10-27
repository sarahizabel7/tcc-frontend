import * as React from 'react';

import { RootReducerInterface } from '../../interfaces/reducersInterface';
import { history } from '../../main/history';
import Brand from '../Logo/Logo';
import LoggedNavBar from './LoggedNavBar';
import NotLoggedNavBar from './NotLoggedNavBar';

export default (props: OwnProps) => {
	const [search, setSearch] = React.useState('')

	const handleSearch = () => {
		const searchObject = {
			pathname: `/search/${search}`,
		}
		history.push(searchObject)
	}

	return (
		<React.Fragment>
			<div className='row'>
				<div className='col push-s1 s2'>
					<Brand />
				</div>
				<div className='col s6'>
					<form onSubmit={handleSearch}>
						<div className='input-field'>
							<input
								id='search'
								type='search'
								className='grey-text text-darken-3'
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
							/>
							<label className='label-icon' htmlFor='search'>
								<i className='grey-text text-darken-3 material-icons'>
									search
								</i>
							</label>
							{/* <i className='grey-text text-darken-3 material-icons'>
								close
							</i> */}
						</div>
					</form>
				</div>
				<div className='s4'>
					<ul className='hide-on-med-and-down'>
						<li />
						{ props.user.token && (!props.user.isProvider && !props.user.provider) && <li>
							<a
								className='grey-text text-darken-3'
								onClick={props.openProvider}
							>
								Torne-se um profissional
							</a>
						</li> }
						{props.user.token ? (
							<LoggedNavBar
								logout={props.logout}
								user={props.user}
							/>
						) : (
							<NotLoggedNavBar
								openLogin={props.openLogin}
								openRegister={props.openRegister}
							/>
						)}
					</ul>
				</div>
			</div>
		</React.Fragment>
	)
}

interface OwnProps {
	openRegister: () => void
	openLogin: () => void
	openProvider: () => void
	user: RootReducerInterface['user']
	logout: () => void
}
