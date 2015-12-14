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
            suggestions: new Map(),
            userSearching: false,
        }
    }

    handleChange = () => {
        this.getSuggestions(this.refs.filterTextInput.value, this.props.data)
        this.props.onUserInput(this.refs.filterTextInput.value);
        if (this.refs.suggestionsList) this.refs.suggestionsList.setFocusedIndex(-1);
        if (!this.state.userSearching) this.setState({userSearching: true})
    }

    blockSubmit(e) {
        e.preventDefault();
        return false;
    }

    componentDidMount() {
        this.refs.filterTextInput.value = this.props.filterText;
    }

    setSuggestion(suggestion, suggestionType) {
        this.refs.filterTextInput.value = suggestion;
        this.props.onUserInput(this.refs.filterTextInput.value);
        this.blurHandler();
    }

    getSuggestions(searchInput, data) {
        var suggestions = new Map();
        if (searchInput) {
            if (!this.props.exactSearch) searchInput = searchInput.toLowerCase();
            suggestions = Filtering.getMatchesFromArray(searchInput, data, this.props.exactSearch)
            suggestions = Filtering.objectToMap(suggestions, true);
            var newSuggestions = Filtering.getNewProperties(this.state.suggestions, suggestions);
        }
        this.setState({suggestions})
        return suggestions;
    }
    shouldDisplayAutocomplete(){
        return (this.props.autocomplete && this.state.userSearching &&
            this.state.suggestions && this.state.suggestions.size &&
            this.refs && this.refs.filterTextInput && this.refs.filterTextInput.value);
    }
    blurHandler = (event) => {
        console.log("blur handler");
        setTimeout(()=>this.setState({userSearching: false}), 300);
    }
    focusHandler = (event) => {
        console.log("focus handler");
        this.setState({userSearching: true});
    }
    arrowHandler = (event) => {
        if ((event.keyCode == 40 || event.keyCode == 38 || event.keyCode == 13) &&
            this.shouldDisplayAutocomplete()) {
            let suggestionList = this.refs.suggestionsList;
            if (event.keyCode == 40)
                suggestionList.goDownSuggestions();
            else if (event.keyCode == 38)
                suggestionList.goUpSuggestions();
            else if (event.keyCode == 13) {
                let selectedSuggestion = suggestionList.getSuggestionFocusedOn();
                suggestionList.selectSuggestion(selectedSuggestion.suggestion, selectedSuggestion.suggestionType);
                console.log(event.target);
            }
            event.preventDefault();
        }
    }

    render() {
        var input =
            <input
                type="text"
                placeholder={this.props.placeholder}
                ref="filterTextInput" onChange={this.handleChange}
                className="SearchApp-searchbar form-control search-query"
                autoComplete={"off"}
                />
        var autoComplete = "";
        if (this.shouldDisplayAutocomplete()) {
            autoComplete = <AutoCompleteSuggestions
                ref="suggestionsList"
                suggestions={this.state.suggestions}
                autocompleteLimit={this.props.autocompleteLimit}
                autocompleteThreshold={this.props.autocompleteThreshold}
                changeSearchBar={this.setSuggestion.bind(this)}
                />
        }
        return (<div className={"searchbar dropdown " + (autoComplete ? "open" :"open")}
                     onBlur={this.blurHandler}
                     onFocus={this.focusHandler}
                >
                <form
                    onSubmit={this.blockSubmit}
                    className={"searchbar-form"}
                    onKeyDown={this.arrowHandler.bind(this)}
                    >
                    {input}
                </form>
                {autoComplete}
            </div>
        )
    }
}