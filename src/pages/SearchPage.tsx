import * as React from 'react';

import SearchContainer from '../containers/SearchContainer';

const containerStyle: React.CSSProperties = {
    display: 'flex',
    minHeight: 'calc(100vh - 249px)',
    width: '100%'
}

interface SearchPageProps {
    searchedText: string
}

const SearchPage = ({searchedText}: SearchPageProps) => (
    <div style={containerStyle}>
        <SearchContainer searchedText={searchedText}/>
    </div>
)

export default SearchPage
