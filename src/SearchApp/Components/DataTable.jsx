/**
 * Created by guillaumelebedel on 04/12/15.
 */
import React from 'react';
import DataRow from "./DataRow.jsx";
import DataHeader from "./DataHeader.jsx";
import Formatting from "../formatting.js";
var _ = require("lodash");

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
                                       key={this.props.jsonData[i][this.props.rowKey] || this.props.jsonData[i][Formatting.ROW_UNIQUE_KEY]}/>);
            }
            headers = this.props.columnsToDisplay.map(function (field) {
                return <DataHeader header={field} key={field}/>
            });
        }
        if (this.props.rowsLimiter && rows.length > this.props.rowsLimiter) rows = _.slice(rows, 0, this.props.rowsLimiter);
        return (
            <table className="table table-striped table-hover table-condensed table-responsive">
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
export default DataTable;