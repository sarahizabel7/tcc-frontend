import * as React from 'react'
import { RootReducerInterface } from '../../interfaces/reducersInterface'
import { Dropdown, NavItem, Divider } from 'react-materialize'
const noUser = require('../../../public/assets/images/nouser.png')
import { toPathOnClick } from '../../utils/utils'

export default (props: OwnProps) => {
	return (
		<React.Fragment>
			<li>
				<Dropdown
					trigger={
						<a
							className='grey-text text-darken-3'
							onClick={handleClick}
						>
							<i
								className='material-icons left'
								style={styles.leftIcon}
								onClick={handleClick}
							>
								account_circle
							</i>
							{props.user.name}
							<i
								className='material-icons right'
								style={styles.rightIcon}
								onClick={handleClick}
							>
								arrow_drop_down
							</i>
						</a>
					}
					options={{
						coverTrigger: false,
						hover: true,
						autoTrigger: true,
						constrainWidth: true
					}}
				>
					<NavItem
						onClick={toPathOnClick('/settings/account')}
						className='indigo-text'
					>
						Minha Conta
					</NavItem>
					<Divider />
					<NavItem onClick={props.logout} className='indigo-text'>
						Sair
					</NavItem>
				</Dropdown>
			</li>
		</React.Fragment>
	)
}

const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
	console.log('c')
	e.preventDefault()
	return e.stopPropagation()
}
interface OwnProps {
	user: RootReducerInterface['user']
	logout: () => void
}

const styles = {
	leftIcon: {
		marginRight: '5px'
	},
	rightIcon: {
		marginLeft: '0px'
	}
}
