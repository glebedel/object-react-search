import React from 'react';

export default class SearchBar extends React.Component{
    handleChange = () => {
        this.props.onUserInput(this.refs.filterTextInput.value);
    }
    constructor(props){
        super(props);
    }
    manageSubmit(e) {
        e.preventDefault();
        return false;
    }
    componentDidMount(){
        this.refs.filterTextInput.value = this.props.filterText;
    }
    render() {
        return (
            <form
                onSubmit={this.manageSubmit}
                className="searchbar-form"
                >
                <input
                    type="text"
                    placeholder="Search...."
                    //value={this.props.filterText}
                    ref="filterTextInput" onChange={this.handleChange}
                    className="SearchApp-searchbar form-control search-query"
                    />
            </form>
        );
    }
}