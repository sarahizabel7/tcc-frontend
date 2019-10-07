import * as React from 'react';
import { Button, Col, Modal, Row, Select } from 'react-materialize';
import { PulseLoader } from 'react-spinners';

import { useInput } from '../../hooks/Form';
import { ChargingMethods, ProvidedService, Service } from '../../interfaces/commonInterfaces';
import Input from '../Input/Input';

const btnStyle = {
  position: "absolute",
  top: "25px",
  right: "25px"
};

const header = ({ handleClose }: { handleClose: () => void }) => (
  <div>
    <h4>Criar Serviço</h4>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
      }}
    >
      <Button
        flat
        onClick={handleClose}
        style={btnStyle}
        className="text-black close-button"
      >
        x
      </Button>
    </div>
  </div>
);

export default (props: OwnProps) => {
  const name = useInput("");
  const description = useInput("");
  const price = useInput("");
  const [estimate, setEstimate] = React.useState<boolean | number>(-1);
  const [charging_method, setChargingMethod] = React.useState(
    ChargingMethods.PerHour
  );

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (hasError()) return
    const service: Service = {
      name: name.value,
      description: description.value
    };

    const data: ProvidedService = {
      service,
      price: Number(price.value),
      estimate: Boolean(estimate),
      charging_method
    };

    props.onServiceRegisterClick(data);
  };
  const handleClose = () => {
    props.modalClose();
  };
  // const hasError = () => {
  // 	let phoneError,
  // 		cpfError
  // 	if (phone.value.length > 12) {
  // 		phoneError = 'Telefone inválido'
  // 		phone.setError(phoneError)
  // 	}
  // 	if (!phone.value) {
  // 		phoneError = 'Telefone é requerido'
  // 		phone.setError(phoneError)
  // 	}
  // 	if (!cpf.value) {
  // 		cpfError = 'Cpf é requerido'
  // 		cpf.setError(cpfError)
  // 	}
  // 	if (cpf.value && cpf.value.length !== 14) {
  // 		cpfError = 'Cpf inválido'
  // 		cpf.setError(cpfError)
  // 	}
  // 	return (
  // 		Boolean(phoneError) ||
  // 		Boolean(cpfError)
  // 	)
  // }

  const changeEstimate = (e: React.ChangeEvent) => {
    setEstimate((e.target as any).value);
  };

  const changeChargingMethod = (e: React.ChangeEvent) => {
    setChargingMethod((e.target as any).value);
  };

  return (
    <Modal
      open={props.open}
      className={"register-modal mini no-footer"}
      header={header({ handleClose })}
      style={{
        overflowY: "hidden"
      }}
      options={{
        onCloseEnd: handleClose,
        preventScrolling: true
      }}
    >
      <Row>
        <form onSubmit={handleRegister} style={{ overflowY: "auto" }}>
          <Input s="12" label="Nome" {...name} />
          <Input s="12" label="Descrição" {...description} />

          <Select s="12" value={estimate} onChange={changeEstimate}>
            <option value={-1} disabled>
              Pagamento
            </option>
            <option value={1}>Fixo</option>
            <option value={0}>Orçamento</option>
          </Select>

          {estimate == 1 && (
            <>
              <Select
                s="6"
                value={charging_method}
                onChange={changeChargingMethod}
              >
                <option value="" disabled>
                  Tipo
                </option>
                <option value={ChargingMethods.PerHour}>Por hora</option>
                <option value={ChargingMethods.CloseService}>
                  Valor fechado
                </option>
              </Select>

              <Input s="6" label="Preço" type="number" {...price} />
            </>
          )}

          {!props.loading ? (
            <Button className={"fluid indigo"} s={12}>
              Criar Serviço
            </Button>
          ) : (
            <Col offset={"s4"} s={4}>
              <PulseLoader color="#3F51B5" loading={true} />
            </Col>
          )}
        </form>
      </Row>
    </Modal>
  );
};

interface OwnProps {
  open: boolean;
  onServiceRegisterClick: (providedService?: ProvidedService) => void;
  modalClose: () => void;
  loading: boolean;
}
