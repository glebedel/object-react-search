import React from 'react';
import {render} from 'react-dom';
import FilterObjElement from './filterObjElement.js';

class SearchApp extends React.Component {
    render() {
        return (
            <div>
                <p>Tfw no reload!! ...</p>
                <FilterObjElement />
            </div>
        )
    }
}

render(<SearchApp/>, document.getElementById('searchApp'));