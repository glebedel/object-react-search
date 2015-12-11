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
        this.setState({userSearching: false})
    }
    focusHandler = (event) =>{
        this.setState({userSearching: true})
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
                />

        return (<form
                onSubmit={this.blockSubmit}
                className={"searchbar-form dropdown " +
                (Object.keys(this.state.suggestions).length
                && this.state.userSearching ? "open" :"")}
                onBlur={this.blurHandler}
                onFocus={this.focusHandler}
                >
                {input}
                {autoComplete}
            </form>
        )
    }
}