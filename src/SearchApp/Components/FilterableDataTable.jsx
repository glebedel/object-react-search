/**
 * Created by guillaumelebedel on 04/12/15.
 */
import React from 'react';
//import {render} from 'react-dom';
import Filtering from '../filtering.js'
import Formatting from '../formatting.js';
import SearchBar from './SearchBar.jsx';
import DataTable from './DataTable.jsx';
import DataColumnTogglers from './DataColumnTogglers.jsx';

export default class FilterableDataTable extends React.Component {
    static defaultProps = {jsonData: []}
    static propTypes = {
        columnsToDisplay: React.PropTypes.arrayOf(React.PropTypes.string),
        source: React.PropTypes.string,
    }
    draggedOver = null

    constructor(props) {
        super(props);
        this.state = Object.assign({
            filterText: '',
            jsonData: this.props.data,
            columnsToDisplay: this.props.columnsToDisplay,
            notSearchable: this.props.notSearchable,
            columnsToggler: this.props.columnsToDisplay.slice(),
        }, this.getStateConfig())
    }

    setStateConfig() {
        if (!this.props.storeConfig)
            return;
        localStorage.setItem(this.props.storeConfig, JSON.stringify({
            columnsToDisplay: this.state.columnsToDisplay,
            columnsToggler: this.state.columnsToggler,
            filterText: this.state.filterText
        }));
    }

    getStateConfig() {
        return JSON.parse(localStorage.getItem(this.props.storeConfig));
    }

    trimDataToState(jsonData) {
        jsonData = Formatting.wholeArray(jsonData, this.props.customDataChanges);
        if (!this.state.columnsToDisplay && jsonData && jsonData.length)
            this.state.columnsToDisplay = Object.keys(jsonData[0]);
        var trimmedData = jsonData.map(function (jsonEntry) {
            return Filtering.notKeysFromCopy(jsonEntry, this.state.columnsToDisplay);
        }.bind(this));
        var stringifiedData = trimmedData.map(function (trimmedEntry) {
            return (JSON.stringify(Filtering.keysFromCopy(trimmedEntry, this.state.notSearchable, true)));
        }.bind(this));
        this.setState({jsonData, trimmedData, stringifiedData});
    }

    componentDidMount() {
        if (this.props.source) {
            $.get(this.props.source, (result) => this.trimDataToState(result));
        }
        else {
            this.trimDataToState(this.state.jsonData)
        }
    }

    handleUserInput = (filterText, inStockOnly) => {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    }
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
        togglers.splice(indexDraggedToToggler, 0, draggedName)
            [togglers[indexDraggedToToggler], togglers[indexDraggedColumn]] = [togglers[indexDraggedColumn], togglers[indexDraggedToColumn]];
        this.setState({columnsToDisplay: displayed, columnsTogger: togglers})
    }
    handleColumnDragOver = (event) => {
        this.draggedOver = event.target;
    }

    render() {
        var {...rest} = this.props;
        this.setStateConfig();
        return (
            <div
                onClick={this.onClick}>
                <DataColumnTogglers
                    columnsToDisplay={this.state.columnsToDisplay}
                    toggleHandler={this.handleColumnToggling}
                    columnsToggler={this.state.columnsToggler}
                    displayColumnsToggler={this.props.displayColumnsToggler}
                    columnDraggingHandler={this.handleColumnDragEnd}
                    columnDraggingOverHandler={this.handleColumnDragOver}
                    columnDraggingStartHandler={this.handleColumnDragStart}
                    />
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                    />

                <div><DataTable
                    {...rest}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    dataToDisplay={this.state.trimmedData}
                    stringifiedData={this.state.stringifiedData}
                    columnsToDisplay={this.state.columnsToDisplay}
                    columnDraggingHandler={this.handleColumnDragEnd}
                    jsonData={this.state.jsonData}
                    />
                </div>
            </div>
        );
    }
};
