import * as React from 'react'
import SettingsRouter from '../../components/Routers/SettingsRouter'
import { SideNavItem, Row, Col } from 'react-materialize'
import Nav from './Nav'

export default () => (
	<section className='section section-settings'>
		<Row>
			<Col s={12} m={3} xl={3}>
				<Nav />
			</Col>
			<Col s={12} m={9} xl={9}>
				<SettingsRouter />
			</Col>
		</Row>
	</section>
)
