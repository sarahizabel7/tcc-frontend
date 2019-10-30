import * as React from 'react';
import { Col, Row } from 'react-materialize';

import SettingsRouter from '../../components/Routers/SettingsRouter';
import { RootReducerInterface } from '../../interfaces/reducersInterface';
import Nav from './Nav';

const MainSettings =  (props: Props) => (
	<section className='section section-settings'>
		<Row>
			<Col s={12} m={3} xl={3}>
				<Nav user={props.user}/>
			</Col>
			<Col s={12} m={9} xl={9}>
				<SettingsRouter />
			</Col>
		</Row>
	</section>
)

interface Props {
	user: RootReducerInterface['user']
}


export default MainSettings
