import React from 'react';

var DataColumnTogglers = React.createClass({
    render: function () {
        var columns = [];
        if (this.props.displayColumnsToggler)
            for (let i = 0; i < this.props.columnsToggler.length; i++) {
                let isToggled = this.props.columnsToDisplay.indexOf(this.props.columnsToggler[i]) !== -1;
                let isToggledClass = (isToggled ? "btn btn-success" : "btn");
                columns.push(<li
                        className={isToggledClass}
                        draggable={true}
                        key={"Toggler-" + this.props.columnsToggler[i]}
                        onClick={this.props.toggleHandler}
                        onDragEnd={this.props.columnDraggingHandler}
                        onDragOver={this.props.columnDraggingOverHandler}
                        onDragStart={this.props.columndDraggingStartHandler}
                        >
                        {this.props.columnsToggler[i]}
                    </li>
                );
            }
        return (
            <ul className="column-toggler">
                {columns}
            </ul>
        );
    }
});

export default DataColumnTogglers;