import React from 'react';

var DataHeader = React.createClass({
    render: function () {
        return <th className={"header " + this.props.header} draggable={true}>{this.props.header}</th>
    }
});

export default DataHeader;