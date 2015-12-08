import React from 'react';

var DataHeader = React.createClass({
    render: function () {
        return <th draggable={true}>{this.props.header}</th>
    }
});

export default DataHeader;