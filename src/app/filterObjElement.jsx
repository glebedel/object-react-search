/**
 * Created by Guillaume on 24/11/2015.
 */
import React from 'react';
import {render} from 'react-dom';
import Filtering from './filtering.js'
import Formating from './formatting.js';

var DataHeader = React.createClass({
    render: function () {
        return <th>{this.props.header}</th>
    }
});

var DataRow = React.createClass({
    render: function () {
        var cells = [];
        for (let i = 0; i < this.props.columnsToDisplay.length; i++) {
            let cellValue = this.props.rowToDisplay[this.props.columnsToDisplay[i]] || "";
            cells.push(<td key={this.props.columnsToDisplay[i]}>{cellValue.toString()}</td>)
        }
        return (
            <tr>
                {cells}
            </tr>
        );
    }
});

var DataTable = React.createClass({
    render: function () {
        var rows = [];
        var headers = [];
        var exactMatch = this.props.exactMatch;
        var filterText = exactMatch ? this.props.filterText : this.props.filterText.toLowerCase();
        if (this.props.dataToDisplay) {
            filterText = filterText.split(/(\s+)/);
            //optimize to replace the splits chars
            for (let i = 0; i < this.props.dataToDisplay.length; i++) {
                for (var j = 0, matchesAll = true; j < filterText.length; j++) {
                    let dataAsString = exactMatch ? this.props.stringifiedData[i] :
                        this.props.stringifiedData[i].toLowerCase();
                    if (!dataAsString.includes(filterText[j]))
                        matchesAll = false;
                }
                if (matchesAll)
                    rows.push(<DataRow rowToDisplay={this.props.dataToDisplay[i]}
                                       columnsToDisplay={this.props.columnsToDisplay}
                                       key={this.props.jsonData[i][this.props.rowKey] || this.props.jsonData[i][Formating.ROW_UNIQUE_KEY]}/>);
            }
            headers = this.props.columnsToDisplay.map(function (field) {
                return <DataHeader header={field} key={field}/>
            });
        }
        return (
            <table className="table">
                <thead>
                <tr>
                    {headers}
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var SearchBar = React.createClass({
    handleChange: function () {
        this.props.onUserInput(this.refs.filterTextInput.value);
    },
    manageSubmit: function (e) {
        e.preventDefault();
        return false;
    },
    render: function () {
        return (
            <form
                onSubmit={this.manageSubmit}
                >
                <input
                    type="text"
                    placeholder="Search...."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                    className="form-control search-query"
                    />
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-primary" data-type="last">Search</button>
                  </span>
            </form>
        );
    }
});
var FilterableDataTable = React.createClass({
    getInitialState: function () {
        return {
            filterText: '',
            inStockOnly: false,
            jsonData: this.props.data || {},
            columnsToDisplay: this.props.columnsToDisplay,
            notSearchable: this.props.notSearchable
        }
    },
    trimDataToState: function (jsonData) {
        jsonData = Formating.wholeArray(jsonData);
        if (!this.state.displayFields && jsonData && jsonData.length)
            this.state.displayFields = Object.keys(jsonData[0]);
        var trimmedData = jsonData.map(function (jsonEntry) {
            return Filtering.notKeysFromCopy(jsonEntry, this.state.columnsToDisplay);
        }.bind(this));
        var stringifiedData = trimmedData.map(function (trimmedEntry) {
            return (JSON.stringify(Filtering.keysFromCopy(trimmedEntry, this.state.notSearchable, true)));
        }.bind(this));
        this.setState({jsonData, trimmedData, stringifiedData});
    },
    componentDidMount: function () {
        if (this.props.source)
            $.get(this.props.source, function (result) {
                if (this.isMounted())
                    this.trimDataToState(result);
            }.bind(this));
        else
            this.trimDataToState(this.state.jsonData)
    },
    handleUserInput: function (filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    },
    render: function () {
        var {...rest} = this.props;
        return (
            <div>
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
                    jsonData={this.state.jsonData}
                    />
                </div>
            </div>
        );
    }
});

export default FilterableDataTable;
