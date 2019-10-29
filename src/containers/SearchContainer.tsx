import * as React from 'react';
import { Card, Col, Row } from 'react-materialize';
import { PulseLoader } from 'react-spinners';
import { isArray } from 'util';

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

const CardContent = (name: string, lastName: string, description?: string, rating?: string) => {
    const cardContentStyle: React.CSSProperties = {
        maxWidth: '100%',
        maxHeight: '125px',
        overflow: 'auto'
    }

    const titleStyle: React.CSSProperties = {
        margin: '0px 8px 0 0',
        fontSize: '16px',
        fontWeight: 'bold'
    }

    const divStyle : React.CSSProperties = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }

    const cardTitleStyle : React.CSSProperties = {
        display: 'flex',
        alignItems: 'center'
    }

    let stars = []

    for (let i = 0; i < Number(rating); i++) {
        stars.push(<i className='fas fa-star red-text text-lighten-1'/>)
    }


    return (
        <div style={cardContentStyle}>
            <div style={cardTitleStyle}>
                <h4 style={titleStyle}>{name} {lastName}</h4>
                {stars}
            </div>
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

    const searchUrl = searchedText ? `search-services/${searchedText}` : 'search-services/'

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const request = await axiosInstance.get(searchUrl)
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
    }, [searchedText])

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
            const description = providerInfo.provider.description || 'Sem descrição disponível'
            const rating = isArray(providerInfo.provider.rating) ? providerInfo.provider.rating[0].grade : providerInfo.provider.rating

            return (
                <Col  l={4} m={6} s={12} key={index}>
                    <Card style={cardStyle} horizontal key={providerInfo.id}
                        header={CardImage(providerInfo.avatar)}
                        actions={[<a style={aStyle} onClick={handleClickContractClick(providerInfo)}>Contratar</a>]}
                    >
                        {CardContent(providerInfo.name, providerInfo.lastname, description, rating)}
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