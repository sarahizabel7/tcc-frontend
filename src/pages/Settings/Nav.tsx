import * as React from 'react';
import { SideNav, SideNavItem } from 'react-materialize';

import { RootReducerInterface } from '../../interfaces/reducersInterface';
import { toPathOnClick } from '../../utils/utils';

const SettingsNav = (props: OwnProps) => (
	<SideNav
		style={{
			position: 'relative',
			height: '100%',
			zIndex: '990',
			transform: 'translateX(0%)'
		}}
		options={{
			draggable: false
		}}
		className='custom-side'
	>
		<SideNavItem divider />
		<SideNavItem
			className='settings-nav-item'
			onClick={toPathOnClick('/settings/resume')}
			icon='list_alt'
		>
			Resumo
		</SideNavItem>
		<SideNavItem
			className='settings-nav-item'
			onClick={toPathOnClick('/settings/messages')}
			icon='message'
		>
			Mensagens
		</SideNavItem>
		{props.user.isProvider && <SideNavItem
			className='settings-nav-item'
			onClick={toPathOnClick('/settings/services')}
			icon='work_outline'
		>
			Serviços
		</SideNavItem>}
		<SideNavItem
			className='settings-nav-item'
			onClick={toPathOnClick('/settings/account')}
			icon='perm_identity'
		>
			Meus dados
		</SideNavItem>
	</SideNav>
)

interface OwnProps {
	user: RootReducerInterface['user']
}

export default SettingsNav