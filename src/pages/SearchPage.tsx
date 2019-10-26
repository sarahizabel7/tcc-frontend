import * as React from 'react';

import SearchContainer from '../containers/SearchContainer';

const containerStyle: React.CSSProperties = {
    display: 'flex',
    minHeight: 'calc(100vh - 249px)'
}

const SearchPage = () => (
    <div style={containerStyle}>
        <SearchContainer/>
    </div>
)

export default SearchPage
