import * as React from 'react';
import { Button, Icon, Table } from 'react-materialize';

import ServiceModal from '../../components/Modal/ServiceModal';
import { ProvidedService } from '../../interfaces/commonInterfaces';

export default (props: Props) => {
  const tableHeader = getHeader();

  const [serviceModalOpen, setServiceModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleAddService = (service: ProvidedService) => {
    console.log(service);
  };

  const handleServiceModalOpen = (open: boolean) => {
    return () => {
      setServiceModalOpen(open);
    };
  };

  return (
    <div>
      { serviceModalOpen && <ServiceModal
        open={serviceModalOpen}
        onServiceRegisterClick={handleAddService}
        loading={loading}
        modalClose={handleServiceModalOpen(false)}
      /> }
      <h5 style={{ marginBottom: "30px" }}>Meus serviços</h5>
      <div>
        <Button
          waves="light"
          className={"indigo"}
          s={12}
          onClick={handleServiceModalOpen(true)}
        >
          Novo serviço
        </Button>
      </div>
      <div>
        <Table>
          {tableHeader}
          <tbody>
            <tr>
              <td>Formatação PC</td>
              <td>R$ 80,00 (valor fechado)</td>
              <td>
                <Icon>edit</Icon>
                <Icon>delete</Icon>
              </td>
            </tr>
            <tr>
              <td>Limpeza PC</td>
              <td>R$ 40,00 (valor fechado)</td>
              <td>
                <Icon>edit</Icon>
                <Icon>delete</Icon>
              </td>
            </tr>
            <tr>
              <td>Backup PC</td>
              <td>R$ 30,00 (valor fechado)</td>
              <td>
                <Icon>edit</Icon>
                <Icon>delete</Icon>
              </td>
            </tr>
            <tr>
              <td>Montar PC</td>
              <td>R$ 110,00 (valor fechado)</td>
              <td>
                <Icon>edit</Icon>
                <Icon>delete</Icon>
              </td>
            </tr>
            <tr>
              <td>Avaliação PC</td>
              <td>Orçamento</td>
              <td>
                <Icon>edit</Icon>
                <Icon>delete</Icon>
              </td>
            </tr>
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

interface Props {}
