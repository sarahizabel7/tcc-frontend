import * as React from 'react'
import { SideNav, SideNavItem, Button } from 'react-materialize'
import { toPathOnClick } from '../../utils/utils'

export default (props: OwnProps) => (
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
		{/* <SideNavItem
			className='remove-a-hover'
			icon='account_circle'
			onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
				e.preventDefault()
			}
		>
			<b>Minha Conta</b>
		</SideNavItem>
		<SideNavItem subheader style={{ marginLeft: '18%' }}>
			Olá, Matheus!
		</SideNavItem> */}
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
		<SideNavItem
			className='settings-nav-item'
			onClick={toPathOnClick('/settings/services')}
			icon='work_outline'
		>
			Serviços
		</SideNavItem>
		<SideNavItem
			className='settings-nav-item'
			onClick={toPathOnClick('/settings/account')}
			icon='perm_identity'
		>
			Meus dados
		</SideNavItem>
	</SideNav>
)

interface OwnProps {}
