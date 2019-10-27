import * as React from 'react';
import { Card, Col, Row } from 'react-materialize';
import { PulseLoader } from 'react-spinners';

import ProviderInfoModal from '../components/Modal/ProviderInfoModal';
import { axiosInstance } from '../utils/httpClient';

interface SearchContainerProps {
    searchedText: string
}

const containerStyle: React.CSSProperties = {
    padding: '3em 4em',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}

const searchResultStyle: React.CSSProperties = {
    flex: '1 0',
    paddingTop: '1em',
    width: '100%'
}

const aStyle: React.CSSProperties = {
    cursor: 'pointer',
    fontSize: '14px'
}

const CardImage = (imageSrc: string | {} ) => {
    const titleStyle: React.CSSProperties = { 
        display: 'flex',
        width: '180px',
        height: 'auto'
    }

    const image = typeof imageSrc === 'object' ? 'https://images.pexels.com/photos/1816593/pexels-photo-1816593.jpeg?auto=compress&cs=tinysrgb&dpr=4&h=180&w=200' : imageSrc as string
    return (
        
        <img src={image} style={titleStyle}/>
    )
}

const CardContent = (name: string, lastName: string, description?: string) => {
    const cardContentStyle: React.CSSProperties = {
        maxWidth: '100%',
        maxHeight: '125px',
        overflow: 'auto'
    }

    const titleStyle: React.CSSProperties = {
        marginTop: '0',
        fontSize: '16px',
        fontWeight: 'bold'
    }

    const divStyle : React.CSSProperties = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }

    return (
        <div style={cardContentStyle}>
            <h4 style={titleStyle}>{name} {lastName}</h4>
            <div style={divStyle} title={description}>{description}</div>
        </div>
    )
}

const loader = () => {
    const loaderStyle: React.CSSProperties = {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '100px'
    }

    return (
        <div style={loaderStyle}>
            <PulseLoader color='#3F51B5' loading={true} />
        </div>
    )
}

const cardStyle: React.CSSProperties = {
    height: '180px',
}

const SearchContainer = ({searchedText}: SearchContainerProps) => {
    const [providedServices, setProvidedServices] = React.useState([])
    const [isLoading, setLoading] = React.useState(false)
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [selectedProvider, setSelectedProvider] = React.useState(null)


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const request = await axiosInstance.get(`search-services/${searchedText}`)
                setProvidedServices(request.data.data)
            } catch(e) {
                const error = e.response.data.data.error
                if (error === 'Users not found.') {
                    setProvidedServices([])
                }
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleClickContractClick = (providerInfo: any) => {
        return () => {
            setModalOpen(true)
            setSelectedProvider(providerInfo)
        }
    }

    const handleModalClose = () => {
        setModalOpen(false)
        setSelectedProvider(null)
    }

    const getCards = () => {
        const providerCards = providedServices.map((providerInfo, index) => {
            const description = providerInfo.description || 'Sem descrição disponível'
            return (
                <Col  l={4} m={6} s={12} key={index}>
                    <Card style={cardStyle} horizontal key={providerInfo.id}
                        header={CardImage(providerInfo.avatar)}
                        actions={[<a style={aStyle} onClick={handleClickContractClick(providerInfo)}>Contratar</a>]}
                    >
                        {CardContent(providerInfo.name, providerInfo.lastname, description)}
                    </Card>
                </Col>
            )
        })

        return (
            <Row style={searchResultStyle}>
                {providerCards}
            </Row>
        )
    }

    const cards = providedServices.length > 0 ? getCards() : 'Não há serviços disponíveis 😥'
    const content = isLoading ? loader() : cards

    return (
        <>
            { isModalOpen && <ProviderInfoModal open={isModalOpen} modalClose={handleModalClose} providerInfo={selectedProvider} /> }
            <div style={containerStyle}>
                <h4>Resultados da busca:</h4>
                    {content}
            </div>
        </>
    )
}

export default SearchContainer