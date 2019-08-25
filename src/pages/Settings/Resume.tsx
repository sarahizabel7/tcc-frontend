import * as React from 'react'
import { Chip } from 'react-materialize'

export default () => (
	<div>
		<ul className='collection with-header'>
			<li className='collection-header'>
				<h6>Mensagens</h6>
			</li>
			<li className='collection-item'>
				<Chip>1</Chip> Que você ainda não respondeu
			</li>
		</ul>

		<ul className='collection with-header'>
			<li className='collection-header'>
				<h6>Serviços Contratados</h6>
			</li>
			<li className='collection-item'>
				<Chip>1</Chip> Ativos
			</li>
			<li className='collection-item'>
				<Chip>1</Chip> Finalizados
			</li>
		</ul>

		<ul className='collection with-header'>
			<li className='collection-header'>
				<h6>Serviços Realizados</h6>
			</li>
			<li className='collection-item'>
				<Chip>1</Chip> Ativos
			</li>
			<li className='collection-item'>
				<Chip>2</Chip> Finalizados
			</li>
		</ul>
	</div>
)
