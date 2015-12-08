import React from 'react';
import Formatting from '../formatting.js';

var DataRow = React.createClass({
    render: function () {
        var cells = [];
        for (let i = 0; i < this.props.columnsToDisplay.length; i++) {
            let cellValue = this.props.rowToDisplay[this.props.columnsToDisplay[i]] || "";
            cells.push(<td key={this.props.columnsToDisplay[i]}>{Formatting.toCellString(cellValue)}</td>)
        }
        return (
            <tr>
                {cells}
            </tr>
        );
    }
});

export default DataRow;