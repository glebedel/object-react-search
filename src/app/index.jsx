import '../styles/searchStyles.css';
import React from 'react';
import {render} from 'react-dom';
import FilterableDataTable from './filterObjElement.jsx';
import Filtering from './filtering.js';

render(<FilterableDataTable source="/data_files/sample.json"
                            exactMatch={false}
                            columnsToDisplay={["kind", "artistName", "collectionName", "trackName", "trackPrice"]}
                            rowKey={"trackId"}
                            notSearchable={["trackPrice"]}/>, document.getElementById('searchApp'));

