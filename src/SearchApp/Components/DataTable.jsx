/**
 * Created by guillaumelebedel on 04/12/15.
 */
import React from 'react';
import DataRow from "./DataRow.jsx";
import DataHeader from "./DataHeader.jsx";
import Formatting from "../formatting.js";
var _ = require("lodash");


export default class DataTable extends React.Component {
    static defaultProps = {sort: {sortable:false}}
    constructor(props) {
        super(props);
        this.state = {
            sort: this.props.sort.default,
        }
    }
    createHeaders(){
        var headers = [];
        var self = this;
        headers = this.props.columnsToDisplay.map(function (field) {
            if (self.state.sort)
                return <DataHeader onClick={self.handleColumnClick} header={field} key={field}/>
            else
                return <DataHeader header={field} key={field} sort/>
        });
        return headers;
    }
    handleColumnClick = (event)=> {
//        let sort = event.target.parentNode.children.indexOf(event.target);
//        <i class="material-icons">keyboard_arrow_down</i>
    }

    render() {
        var rows = [];
        var headers = [];
        var exactMatch = this.props.exactMatch;
        var selectedRows = [];
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
                if (matchesAll || this.props.searchType === "highlight") {
                    rows.push(<DataRow rowToDisplay={this.props.dataToDisplay[i]}
                                       columnsToDisplay={this.props.columnsToDisplay}
                                       key={this.props.jsonData[i][this.props.rowKey] || this.props.jsonData[i][Formatting.ROW_UNIQUE_KEY]}
                                       isMatch={matchesAll}
                                       searchType={this.props.searchType}
                        />);
                    selectedRows.push(this.props.dataToDisplay[i]);
                }
            }
            this.props.setDataMatchingSearch(selectedRows);
        }
        if (this.props.rowsLimiter && rows.length > this.props.rowsLimiter) rows = _.slice(rows, 0, this.props.rowsLimiter);
        return (
            <table className="table table-striped table-hover table-condensed table-responsive">
                <thead>
                <tr>
                    {this.createHeaders()}
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}