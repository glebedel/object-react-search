import React from 'react';
import Filtering from "../filtering.js"

export default class SearchBar extends React.Component{
    static defaultProps = {placeholder: ["Search..."]}
    static propTypes = {
    }
    constructor(props){
        super(props);
    }
    handleChange = () => {
        this.getSuggestions(this.refs.filterTextInput.value, this.props.data)
        this.props.onUserInput(this.refs.filterTextInput.value);
    }
    blockSubmit(e) {
        e.preventDefault();
        return false;
    }
    componentDidMount(){
        this.refs.filterTextInput.value = this.props.filterText;
    }
    getSuggestions(searchInput, data){
        if (!this.props.exactSearch) searchInput = searchInput.toLowerCase();
        var suggestions = Filtering.getMatchesFromArray(searchInput, data, this.props.exactSearch)
        console.log(suggestions)
    }
    render() {
        return (
            <form
                onSubmit={this.blockSubmit}
                className="searchbar-form"
                >
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    ref="filterTextInput" onChange={this.handleChange}
                    className="SearchApp-searchbar form-control search-query"
                    />
            </form>
        );
    }
}