import * as React from 'react'
import { Icon } from 'react-materialize'

export default () => (
	<footer className='page-footer indigo'>
		<div className='container'>
			<div className='row'>
				<div className='col l6 s12'>
					<h5 className='white-text'>About us</h5>
					
				</div>
				<div className='col l4 offset-l2 s12'>
					<h5 className='white-text'>Links</h5>
					<ul>
						<li>
							<a
								className='grey-text text-lighten-3'
								href='index.html'
							>
								Home
							</a>
							<span style={{
								marginLeft: '5px'
							}}>
								<a href='https://facebook.com' style={aStyle} target="_blank">
									<i className="fab fa-facebook"/>
								</a>
								<a href='https://instagram.com' style={aStyle} target="_blank">
									<i className="fab fa-instagram"/>
								</a>
								<a href='https://linkedin.com' style={aStyle} target="_blank">
									<i className="fab fa-linkedin"/>
								</a>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div className='footer-copyright indigo  lighten-2'>
			<div className='container'>
				bazzu &copy; 2019
				<a className='grey-text text-lighten-4 right' href='#!'>
					Termos e Condições
				</a>
			</div>
		</div>
	</footer>
)

const aStyle = {
	marginLeft: '5px',
	marginRight: '5px',
	color: 'white'
}
