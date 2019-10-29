import * as React from 'react';

import { history } from '../../main/history';


const Header = () => {
	const handleClick = () => {
		const searchObject = {
			pathname: `/search/`,
		}
		history.replace(searchObject)
	}

	return (
		<section className='section section-header'>
			<div className='showcase'>
				<div className='row'>
					<div className='col s12 m10 offset-m1 left'>
						<h3 className='white-text text-darken-4'>
							O jeito fácil de contratar um serviço
						</h3>
						<h5 className='white-text text-darken-4'>
							Contrate com apenas alguns clicks!
						</h5>
						<br />
						<br />
						<button className='btn btn-large indigo' onClick={handleClick}>
							Encontre serviços
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Header
