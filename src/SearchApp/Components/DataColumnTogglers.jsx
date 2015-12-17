import React from 'react';

var DataColumnTogglers = React.createClass({
    onDragOverHandler: _.throttle(function (event) {
        var allTogglers = event.target.parentNode.childNodes;
        for (var i = 0; i < allTogglers.length; i++) {
            if (allTogglers[i].classList.contains('drag-over'))
                allTogglers[i].classList.remove('drag-over')
        };
        event.target.classList.add('drag-over')
        this.props.columnDraggingOverHandler(event);
    }, 200),
    onDragEndHandler: function (event) {
        setTimeout(function () {
            var allTogglers = event.target.parentNode.childNodes;
            for (var i = 0; i < allTogglers.length; i++) {
                if (allTogglers[i].classList.contains('drag-over'))
                    allTogglers[i].classList.remove('drag-over')
            };
        }.bind(this), 200);
        this.props.columnDraggingHandler(event);
    },
    render: function () {
        var columns = [];
        if (this.props.displayColumnsToggler)
            for (let i = 0; i < this.props.columnsToggler.length; i++) {
                let isToggled = this.props.columnsToDisplay.indexOf(this.props.columnsToggler[i]) !== -1;
                let isToggledClass = (isToggled ? "btn btn-raised btn-success" : "btn btn-raised btn-default");
                columns.push(<li
                        className={isToggledClass}
                        draggable={true}
                        key={"Toggler-" + this.props.columnsToggler[i]}
                        onClick={this.props.toggleHandler}
                        onDragEnd={this.onDragEndHandler}
                        onDragOver={this.onDragOverHandler}
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