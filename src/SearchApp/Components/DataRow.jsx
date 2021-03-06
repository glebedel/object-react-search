import React from 'react';
import Formatting from '../formatting.js';

var DataRow = React.createClass({
    render: function () {
        let temporaryRow = [];
        for (let i = 0; i < this.props.columnsToDisplay.length; i++) {
            temporaryRow.push(Formatting.toCellString(this.props.rowToDisplay[this.props.columnsToDisplay[i]] || ""));
        }
        let cells =[]
        if (temporaryRow.join("").length > 0)
            for (let i = 0; i < temporaryRow.length; i++) {
                cells.push(<td className={"cell " + this.props.columnsToDisplay[i]}
                               key={this.props.columnsToDisplay[i]}>{temporaryRow[i]}</td>)
            }
        return (
            <tr className={this.props.searchType === "highlight" && this.props.isMatch ? "success search-highlight" : "not-match"}
                >
                {cells}
            </tr>
        );
    }
});

export default DataRow;