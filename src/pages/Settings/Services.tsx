import * as React from 'react';
import { Button, Icon, Table } from 'react-materialize';

import ServiceModal from '../../components/Modal/ServiceModal';
import { getChargingMethodTranslation, ProvidedService } from '../../interfaces/commonInterfaces';
import { RootReducerInterface } from '../../interfaces/reducersInterface';

const Services = ({
	user,
	loading
}: Props) => {
	const tableHeader = getHeader();

	const [serviceModalOpen, setServiceModalOpen] = React.useState(false);
	const [selectedService, setSelectedService] = React.useState<ProvidedService>(null)

	const handleAddService = (service: ProvidedService) => {
		console.log(service);

		const findIfExists = user.provider.provided_services.find(({_id}) => {
			return service._id === _id
		})
		
		console.log(findIfExists)

	};

	const handleEdit = (service: ProvidedService) => {
		return () => {
			setSelectedService(service)
			setServiceModalOpen(true)
		}
	};

	const handleDelete = (service: ProvidedService) => {
		return () => {
			const deletedService = user.provider.provided_services.filter(({_id}) => {
				_id !== service._id
			}) 
			console.log('newList', deletedService)
		}
	};

	const handleServiceModalOpen = (open: boolean) => {
		return () => {
			if(!open) {
				setSelectedService(null)
			}
			setServiceModalOpen(open);
		};
	};

	const renderServices = () => {
		return user.provider.provided_services.map((providedService, idx) => {
			const { estimate, charging_method, price, service } = providedService
			const priceString = estimate ? 'Orçamento' : `R$ ${price.toFixed(2)} (${getChargingMethodTranslation(charging_method)})`

			return (
				<tr key={idx}>
					<td>{service.name}</td>
					<td>{priceString}</td>
					<td>
						<a onClick={handleEdit(providedService)}><Icon className='servicesIcon'>edit</Icon></a>
						<a onClick={handleDelete(providedService)}><Icon className='servicesIcon'>delete</Icon></a>
					</td>
				</tr>
			)
		}) 
	}

	return (
		<div>
			{ serviceModalOpen &&
				<ServiceModal
					open={ serviceModalOpen }
					onServiceRegisterClick={ handleAddService }
					providedService={selectedService}
					loading={ loading }
					modalClose={ handleServiceModalOpen(false) }
				/> }
			<h5 style={ { marginBottom: "30px" } }>Meus serviços</h5>
			<div>
				<Button
					waves="light"
					className={ "indigo" }
					s={ 12 }
					onClick={ handleServiceModalOpen(true) }
				>
					Novo serviço
        </Button>
			</div>
			<div>
				<Table>
					{ tableHeader }
					<tbody>
						{renderServices()}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

const getHeader = () => (
	<thead>
		<tr>
			<th data-field="id">Nome</th>
			<th data-field="name">Preço</th>
			<th data-field="price">Ações</th>
		</tr>
	</thead>
);

interface Props {
	loading: boolean
	user: RootReducerInterface['user'],
	handleServicesUpdate: (providedServices: ProvidedService[]) => void
}

export default Services