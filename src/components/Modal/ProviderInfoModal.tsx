import * as React from 'react';
import { Button, Chip, Modal } from 'react-materialize';

import { getChargingMethodTranslation, ProvidedService } from '../../interfaces/commonInterfaces';

interface OwnProps {
    open: boolean;
    modalClose: () => void;
    providerInfo: any
  }

const btnStyle = {
  position: "absolute",
  top: "25px",
  right: "25px"
};

const modalContentStyle: React.CSSProperties = {
    display: 'flex',
    justifyItems: 'center',
}

const providerInfoContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
    minHeight: '16em',
    position: 'relative',
    width: '100%'
}

const avatarStyle: React.CSSProperties = {
    height: 'auto',
    width: '200px',
    zIndex: 2
}

const footerInfo: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '0',
    height: '100%',
    maxHeight: '33px',
    borderTop: '1px solid rgba(160, 160, 160, 0.4)',
    width: 'calc(100% + 48px)'
}

const spanIconStyle: React.CSSProperties = {
    margin: '0 0.4em'
}

const iconStyle: React.CSSProperties = {
    color: '#9FA8D9'
}

const providerInfoContent: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    height: 'calc(100% - 86px)',
    paddingLeft: '1em'
}

const header = ({ handleClose }: { handleClose: () => void }) => (
  <div>
    <h4>Contratar serviço</h4>
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

const getProvidedServices = (provided_services: ProvidedService[]) => {
    const listStyle: React.CSSProperties = {
        overflowY: 'auto',
        height: 'auto',
        maxHeight: 'calc(100% - 1em)',
        width: '100%',
        backgroundColor: '#FFFFFF'
    }
    
    return (
        <ul className='collection with-header' style={listStyle}>
            <li className="collection-header"><h6>Serviços oferecidos</h6></li>
            {provided_services.map((({charging_method, estimate, price, service}, index) => {
                const servicePrice =  estimate ? 'Orçamento' : `R$ ${price.toFixed(2)} (${getChargingMethodTranslation(charging_method)})`
                return (
                    <li className='collection-item' key={index}>{service.name} {servicePrice}</li>
                )
            }))}   
        </ul>
    )
}

const getTitle = (providerInfo: any) => {
    const titleStyle: React.CSSProperties = {
        display: 'flex',
        width: '100%',
        paddingLeft: '1em',
        alignItems: 'center'
    }

    const hStyle: React.CSSProperties = {
        marginRight: '5px' 
    }

    console.log(providerInfo)
    return (
        <div style={titleStyle}>
            <h5 style={hStyle}>{providerInfo.name} {providerInfo.lastname}</h5>
            {providerInfo.provider.atendency_region.map((({name, id}: {name: string, id: string}) => {
                return (
                    <Chip key={id} className='custom-chip'>
                        {name}
                    </Chip>
                )
            }))}    
        </div>
        
    )
}

const ProviderInfoModal = ({
    modalClose,
    open,
    providerInfo
}: OwnProps) => {
    const providedServices = getProvidedServices(providerInfo.provider.provided_services)
    const title = getTitle(providerInfo)

    return (
        <Modal
            open={open}
            className={"register-modal no-footer"}
            header={header({ handleClose: modalClose })}
            style={{
                overflowY: "hidden",
                width: '55em'
            }}
            options={{
                onCloseEnd: modalClose,
                preventScrolling: true
            }}
        >
            <div style={modalContentStyle}>
                <img style={avatarStyle} src={providerInfo.avatar}/>
                <div style={providerInfoContainer}>
                    {title}
                    <div style={providerInfoContent}>
                        {providedServices}
                    </div>
                    <div style={footerInfo}>
                        <span style={spanIconStyle}>
                            <i style={iconStyle} className="fas fa-phone"/> {providerInfo.phone}
                        </span>
                        <span style={spanIconStyle}>
                            <i style={iconStyle} className="fa fa-envelope"/> {providerInfo.email}
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProviderInfoModal