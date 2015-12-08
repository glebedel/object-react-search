import React from 'react';

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
                className="searchbar-form"
                >
                <input
                    type="text"
                    placeholder="Search...."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                    className="SearchApp-searchbar form-control search-query"
                    />
            </form>
        );
    }
});

export default SearchBar;