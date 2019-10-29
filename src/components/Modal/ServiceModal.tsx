import * as React from 'react';
import { Button, Col, Modal, Row, Select } from 'react-materialize';
import { PulseLoader } from 'react-spinners';

import { useInput } from '../../hooks/Form';
import { ChargingMethods, ProvidedService, Service } from '../../interfaces/commonInterfaces';
import Input from '../Input/Input';

const uuidv1 = require('uuid/v1');

const btnStyle = {
	position: "absolute",
	top: "25px",
	right: "25px"
};

const header = ({ handleClose, providedService }: { handleClose: () => void, providedService?: ProvidedService }) => (
	<div>
		{ providedService ? 'Editar serviço' : 'Criar serviço'}
		<div
			style={ {
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-end"
			} }
		>
			<Button
				flat
				onClick={ handleClose }
				style={ btnStyle }
				className="text-black close-button"
			>
				x
     		 </Button>
		</div>
	</div>
);

export default ({
	loading,
	modalClose,
	onServiceRegisterClick,
	open,
	providedService,
}: OwnProps) => {
	const providerServiceEstimate = (estimate?: boolean) => {
		if (estimate !== undefined) {
			return estimate
		} 
		return 0
	}

	const nameValue = providedService && providedService.service.name || ""
	const descriptionValue = providedService && providedService.service.description || ""
	const priceValue = providedService && String(providedService.price) || ""
	const estimateValue = providedService ? providerServiceEstimate(providedService.estimate) : -1
	const chargingMethodValue = providedService && providedService.charging_method || ChargingMethods.PerHour

	const name = useInput(nameValue);
	const description = useInput(descriptionValue);
	const price = useInput(priceValue);
	const [estimate, setEstimate] = React.useState<boolean | number>(estimateValue);
	const [charging_method, setChargingMethod] = React.useState(chargingMethodValue);

	const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const serviceUID = providedService ? providedService.service._id : uuidv1()
		const providedServiceUID = providedService ? providedService._id : uuidv1()

		const service: Service = {
			_id: serviceUID,
			name: name.value,
			description: description.value
		};

		const data: ProvidedService = {
			_id: providedServiceUID,
			service,
			price: Number(price.value),
			estimate: Boolean(estimate),
			charging_method
		};

		onServiceRegisterClick(data);
	};
	const handleClose = () => {
		modalClose();
	};

	const changeEstimate = (e: React.ChangeEvent) => {
		setEstimate((e.target as any).value);
	};

	const changeChargingMethod = (e: React.ChangeEvent) => {
		setChargingMethod((e.target as any).value);
	};

	const buttonIsDisabled = !name.value || !description.value || estimate === -1 || (estimate == 0 && !price.value)

	return (
		<Modal
			open={ open }
			className={ "register-modal mini no-footer" }
			header={ header({ handleClose, providedService }) }
			style={ {
				overflowY: "hidden"
			} }
			options={ {
				onCloseEnd: handleClose,
				preventScrolling: true
			} }
		>
			<Row>
				<form onSubmit={ handleRegister } style={ { overflowY: "auto" } }>
					<Input s="12" label="Nome" { ...name } />
					<Input s="12" label="Descrição" { ...description } />

					<Select s="12" value={ estimate } onChange={ changeEstimate }>
						<option value={ -1 } disabled>
							Pagamento
            			</option>
						<option value={ 0 }>Fixo</option>
						<option value={ 1 }>Orçamento</option>
					</Select>

					{ estimate == 0 && (
						<>
							<Select
								s="6"
								value={ charging_method }
								onChange={ changeChargingMethod }
							>
								<option value="" disabled>
									Tipo
                				</option>
								<option value={ ChargingMethods.PerHour }>Por hora</option>
								<option value={ ChargingMethods.CloseService }>
									Valor fechado
                				</option>
							</Select>

							<Input s="6" label="Preço" type="number" { ...price } />
						</>
					) }

					{ !loading ? (
						<Button className={ "fluid indigo" } s={ 12 } disabled={buttonIsDisabled}>
							{ providedService ? 'Editar serviço' : 'Criar serviço'}
            			</Button>
					) : (
							<Col offset={ "s4" } s={ 4 }>
								<PulseLoader color="#3F51B5" loading={ true } />
							</Col>
						) }
				</form>
			</Row>
		</Modal>
	);
};

interface OwnProps {
	open: boolean;
	providedService?: ProvidedService;
	onServiceRegisterClick: (providedService?: ProvidedService) => void;
	modalClose: () => void;
	loading: boolean;
}
