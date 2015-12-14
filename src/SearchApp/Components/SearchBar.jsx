import React from 'react';
import Filtering from "../filtering.js"
import AutoCompleteSuggestions from './AutoCompleteSuggestions.js'

var _ = require("lodash");

export default class SearchBar extends React.Component {
    static defaultProps = {placeholder: ["Search..."]}
    static propTypes = {}
    constructor(props) {
        super(props);
        this.state = {
            suggestions: {},
            userSearching: false,
        }
    }

    handleChange = () => {
        this.getSuggestions(this.refs.filterTextInput.value, this.props.data)
        this.props.onUserInput(this.refs.filterTextInput.value);
        if (!this.state.userSearching) this.setState({userSearching: true})
    }

    blockSubmit(e) {
        e.preventDefault();
        return false;
    }

    componentDidMount() {
        this.refs.filterTextInput.value = this.props.filterText;
    }

    extractNewSuggestions(oldSuggestions, newSuggestions) {
        _.forOwn(newSuggestions,)
    }
    setSuggestion(suggestion){
        this.refs.filterTextInput.value = suggestion;
        this.props.onUserInput(this.refs.filterTextInput.value);
    }
    getSuggestions(searchInput, data) {
        var suggestions = {};
        if (searchInput)
        {
            if (!this.props.exactSearch) searchInput = searchInput.toLowerCase();
            var suggestions = Filtering.getMatchesFromArray(searchInput, data, this.props.exactSearch)
            var newSuggestions = Filtering.getNewProperties(this.state.suggestions, suggestions);
        }
        this.setState({suggestions})
        console.log(suggestions)
        return suggestions;
    }

    blurHandler = (event) => {
        setTimeout(()=>this.setState({userSearching: false}), 300);
    }
    render() {
        var input =
            <input
                type="text"
                placeholder={this.props.placeholder}
                ref="filterTextInput" onChange={this.handleChange}
                className="SearchApp-searchbar form-control search-query"
                />
        var autoComplete = "";
            autoComplete = <AutoCompleteSuggestions
                suggestions={this.state.suggestions}
                autocompleteLimit={this.props.autocompleteLimit}
                autocompleteThreshold={this.props.autocompleteThreshold}
                changeSearchBar={this.setSuggestion.bind(this)}
                />

        return (<form
                onSubmit={this.blockSubmit}
                className={"searchbar-form dropdown " +
                (Object.keys(this.state.suggestions).length
                && this.state.userSearching ? "open" :"")}
                onBlur={this.blurHandler}
                >
                {input}
                {autoComplete}
            </form>
        )
    }
}