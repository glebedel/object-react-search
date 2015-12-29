/**
 * Created by guillaumelebedel on 04/12/15.
 */

import '../styles/searchStyles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-material-design/dist/css/material.min.css";
import "bootstrap-material-design/dist/css/ripples.min.css";


import React from 'react';
import Filtering from '../filtering.js'
import Formatting from '../formatting.js';
import SearchBar from './SearchBar.jsx';
import DataTable from './DataTable.jsx';
import Exporter from './Exporter.jsx';
import DataColumnTogglers from './DataColumnTogglers.jsx';

let _ = require("lodash")
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-material-design/dist/js/material.min.js";
import "bootstrap-material-design/dist/js/ripples.min.js";
$.material.init()

export default class FilterableDataTable extends React.Component {
    static defaultProps = {jsonData: [], rowsLimiter: 0}
    static propTypes = {
        columnsToDisplay: React.PropTypes.arrayOf(React.PropTypes.string),
        source: React.PropTypes.string,
        rowsLimiter: React.PropTypes.number
    }
    draggedOver = null
    dataMatchingSearch = null
    constructor(props) {
        super(props);
        this.state = Object.assign({
            filterText: '',
            jsonData: this.props.data,
            columnsToDisplay: this.props.columnsToDisplay,
            columnsToKeep: this.props.columnsToDisplay,
            notSearchable: this.props.notSearchable,
            columnsToggler: this.props.columnsToDisplay.slice(),
            rowsLimiter: this.props.rowsLimiter,
        }, this.getStateConfig())
    }

    setStateConfig(item) {
        if (!item || !item.length)
            return;
        localStorage.setItem(item, JSON.stringify({
            columnsToggler: this.state.columnsToggler,
            columnsToDisplay: this.state.columnsToDisplay,
            filterText: this.state.filterText
        }));
    }
    setDataMatchingSearch = (displayedData)=>{
        this.dataMatchingSearch = displayedData;
    }
    getDataMatchingSearch = (displayedData) =>{
        return this.dataMatchingSearch;
    }
    getStateConfig() {
        return this.props.storeConfig && this.props.storeConfig.baseName &&
            JSON.parse(localStorage.getItem(this.props.storeConfig.baseName));
    }

    trimDataToState(jsonData) {
        jsonData = Formatting.wholeArray(jsonData, this.props.customDataChanges);
        if (!this.state.columnsToKeep && jsonData && jsonData.length)
            this.state.columnsToKeep = Object.keys(jsonData[0]);
        let trimmedData = jsonData.map((jsonEntry) => Filtering.notKeysFromCopy(jsonEntry, this.state.columnsToKeep));
        let searchableData = trimmedData.map((trimmedEntry) => Filtering.keysFromCopy(trimmedEntry, this.state.notSearchable, true));
        let stringifiedData = searchableData.map((searchableEntry) => JSON.stringify(searchableEntry).toLowerCase());
        this.setState({jsonData, trimmedData, searchableData, stringifiedData});
    }

    componentDidMount() {
        if (this.props.source) {
            $.get(this.props.source, (result) => this.trimDataToState(result));
        }
        else {
            this.trimDataToState(this.state.jsonData)
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    handleUserInput = _.debounce((filterText)=> {
        this.setState({filterText})
    }, 150)

    handleColumnToggling = (event) => {
        if (this.draggedOver)
            return;
        let indexToggler = Array.prototype.indexOf.call(event.currentTarget.parentElement.children, event.currentTarget);
        let columnClicked = this.state.columnsToggler[indexToggler];
        let indexDisplayed = this.state.columnsToDisplay.indexOf(columnClicked);
        if (indexDisplayed !== -1)
            this.state.columnsToDisplay.splice(indexDisplayed, 1);
        else
            this.state.columnsToDisplay.splice(indexToggler, 0, columnClicked)
        this.setState({columnsToDisplay: this.state.columnsToDisplay});
    }
    handleColumnDragEnd = (event) => {
        if (!this.draggedOver)
            return;
        let displayed = this.state.columnsToDisplay;
        let togglers = this.state.columnsToggler;
        let lastDraggedOver = this.draggedOver;
        this.draggedOver = null;
        let indexDraggedToggler = Array.prototype.indexOf.call(event.target.parentElement.children, event.target);
        let draggedName = togglers[indexDraggedToggler];
        let indexDraggedColumn = displayed.indexOf(draggedName);
        if (indexDraggedColumn === -1)
            return;
        let indexDraggedToToggler = Array.prototype.indexOf.call(lastDraggedOver.parentElement.children, lastDraggedOver);
        let draggedToName = togglers[indexDraggedToToggler];
        let indexDraggedToColumn = displayed.indexOf(draggedToName);
        if (indexDraggedToColumn === -1)
            return;
        displayed.splice(indexDraggedColumn, 1);
        togglers.splice(indexDraggedToggler, 1);
        displayed.splice(indexDraggedToColumn, 0, draggedName);
        togglers.splice(indexDraggedToToggler, 0, draggedName);
        this.setState({columnsToDisplay: displayed, columnsTogger: togglers})
    }
    handleColumnDragOver = (event) => {
        this.draggedOver = event.target;
    }
    render() {
        let {storeConfig, displayColumnsToggler, ...rest} = this.props;
        this.setStateConfig(storeConfig.baseName);
        return (
            <div
                onClick={this.onClick}>
                <DataColumnTogglers
                    columnsToKeep={this.state.columnsToKeep}
                    columnsToDisplay={this.state.columnsToDisplay}
                    toggleHandler={this.handleColumnToggling}
                    columnsToggler={this.state.columnsToggler}
                    displayColumnsToggler={displayColumnsToggler}
                    columnDraggingHandler={this.handleColumnDragEnd}
                    columnDraggingOverHandler={this.handleColumnDragOver}
                    />
                <SearchBar
                    placeholder="Search..."
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput}
                    dataArray={this.state.trimmedData}
                    higlighting={false}
                    autocomplete={this.props.autocomplete}
                    data={this.state.searchableData}
                    exactSearch={this.props.exactMatch}
                    />
                <div>
                    <Exporter types={this.props.exporters} getData={this.getDataMatchingSearch}/>
                    <DataTable
                    {...rest}
                    rowsLimiter={this.state.rowsLimiter}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    dataToDisplay={this.state.trimmedData}
                    stringifiedData={this.state.stringifiedData}
                    columnsToDisplay={this.state.columnsToDisplay}
                    columnDraggingHandler={this.handleColumnDragEnd}
                    setDataMatchingSearch={this.setDataMatchingSearch}
                    jsonData={this.state.jsonData}
                    />
                </div>
            </div>
        );
    }
}
;
