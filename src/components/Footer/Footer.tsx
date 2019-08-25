import * as React from 'react'

export default () => (
	<footer className='page-footer indigo'>
		<div className='container'>
			<div className='row'>
				<div className='col l6 s12'>
					<h5 className='white-text'>About us</h5>
					<p className='grey-text text-lighten-4'>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Officia sit aliquid, illo eveniet dolorum eius?
					</p>
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
