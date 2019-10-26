import * as React from 'react';
import { Card, Col, Row } from 'react-materialize';

const containerStyle: React.CSSProperties = {
    padding: '3em 4em',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}

const searchResultStyle: React.CSSProperties = {
    flex: '1 0',
    paddingTop: '1em'
}

const handleClick = () => {
    
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

const CardActions = () => {
    const aStyle: React.CSSProperties = {
        cursor: 'pointer',
        fontSize: '14px'
    }
    
    return (
        <a style={aStyle} onClick={handleClick}>Contratar</a>
    )
}

const CardContent = (name: string, description?: string) => {
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
            <h4 style={titleStyle}>{name}</h4>
            <div style={divStyle} title={description}>{description}</div>
        </div>
    )
}

const cardStyle: React.CSSProperties = {
    height: '180px',
}

const SearchContainer = () => {
    return (
        <div style={containerStyle}>
            <h4>Resultados da busca:</h4>
            <Row style={searchResultStyle}>
                <Col  l={4} m={6} s={12}>
                    <Card style={cardStyle} horizontal header={<CardImage />} actions={[<CardActions/>]}>
                        {CardContent('André dos Santos', 'Mestre de obras há 14 anos')}
                    </Card>
                </Col>
                <Col  l={4} m={6} s={12}>
                    <Card style={cardStyle} horizontal header={CardImage(`https://images.pexels.com/photos/791157/pexels-photo-791157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=180&w=200`)} actions={[<CardActions/>]}>
                        {CardContent('Fernanda Faria', 'Manicure profissional')}
                    </Card>
                </Col>
                <Col  l={4} m={6} s={12}>
                    <Card style={cardStyle} horizontal header={CardImage(`https://images.pexels.com/photos/975668/pexels-photo-975668.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=180&w=200`)} actions={[<CardActions/>]}>
                        {CardContent('Kátia', 'Oculista a domicílio')}
                    </Card>
                </Col>
                <Col  l={4} m={6} s={12}>
                    <Card style={cardStyle} horizontal header={CardImage(`https://images.pexels.com/photos/50711/board-electronics-computer-data-processing-50711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=180&w=200`)} actions={[<CardActions/>]}>
                        {CardContent('Marcos Martins', 'Formatação e Limpeza de computadores')}
                    </Card>
                </Col>
                <Col  l={4} m={6} s={12}>
                    <Card style={cardStyle} horizontal header={CardImage(`https://images.pexels.com/photos/2624776/pexels-photo-2624776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=180&w=200`)} actions={[<CardActions/>]}>
                        {CardContent('Jorge Tatto', 'Tatuador focado em traços realistastttttttttttttttttttttttttttttttttttttttttttttttttttt')}
                    </Card>
                </Col>
                <Col  l={4} m={6} s={12}>
                    <Card style={cardStyle} horizontal header={CardImage(`https://images.pexels.com/photos/2801980/pexels-photo-2801980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=180&w=200`)} actions={[<CardActions/>]}>
                        {CardContent('Maria dos Donuts', 'Donuts e doces sob encomenda')}
                    </Card>
                </Col>
                <Col  l={4} m={6} s={12}>
                    <Card style={cardStyle} horizontal header={CardImage(`https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=180&w=200`)} actions={[<CardActions/>]}>
                        {CardContent('Marta Machado', 'Fotógrafa especialista em fotos de casamento')}
                    </Card>
                </Col>
                <Col  l={4} m={6} s={12}>
                    <Card style={cardStyle} horizontal header={CardImage(`https://images.pexels.com/photos/48889/cleaning-washing-cleanup-the-ilo-48889.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=180&w=200`)} actions={[<CardActions/>]}>
                        {CardContent('Jennifer Faxinas', 'Diarista profissional há 12 anos')}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default SearchContainer