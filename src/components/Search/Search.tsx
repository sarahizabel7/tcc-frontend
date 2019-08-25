import * as React from 'react'

export default () => (
	<section
		id='search'
		className='section section-search indigo accent-3 white-text center'
	>
		<div className='container'>
			<div className='row'>
				<div className='col s12'>
					<div className='input-field'>
						<input
							type='text'
							className='white grey-text autocomplete'
							placeholder='O que você precisa?'
							id='autocomplete-input'
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
)
