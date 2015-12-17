/**
 * Created by guillaumelebedel on 11/12/15.
 */
import React from 'react';
import Filtering from '../filtering.js';
var _ = require("lodash");

export default class AutoCompleteSuggestions extends React.Component {
    static defaultProps = {suggestions: {}, autocompleteThreshold: 1}
    static propTypes = {suggestions: React.PropTypes.object}
    displayedSuggestions = []

    constructor(props) {
        super(props);
        this.state = {
            focusedIndex: -1
        }
    }

    getSuggestionFocusedOn() {
        if (this.state.focusedIndex >= 0)
            return this.displayedSuggestions[this.state.focusedIndex];
        else
            return {};
    }

    onClickHandler(event) {
        this.selectSuggestion(event.target.closest('li').dataset.suggestion)
    }

    goDownSuggestions() {
        if (this.state.focusedIndex < this.displayedSuggestions.length - 1)
            this.setState({focusedIndex: this.state.focusedIndex + 1})
    }

    goUpSuggestions() {
        if (this.state.focusedIndex > 0)
            this.setState({focusedIndex: this.state.focusedIndex - 1})
    }

    selectSuggestion(suggestion, suggestionType) {
        this.props.changeSearchBar(suggestion, suggestionType);
    }

    setFocusedIndex(index) {
        this.setState({focusedIndex: index})
    }

    preventUnFocusHandler(event) {
        console.log("preventFocusEvent")
        event.preventDefault();
        event.stopPropagation()
    }

    render() {
        var suggestions = [];
        this.displayedSuggestions = [];
        let maxSuggestions = this.props.autocomplete.limit;
        let totalSuggestionsInserted = 0;
        for (let [resultColumn, allMatches] of this.props.suggestions.entries()) {
            let suggestionsInserted = 0;
            if (suggestions.length)
                suggestions.push(
                    <li
                        onMouseDown={this.preventUnFocusHandler}
                        className="divider"
                        key={"divider-" + resultColumn}>
                    </li>
                )
            suggestions.push(
                <li
                    onMouseDown={this.preventUnFocusHandler}
                    className="dropdown-header"
                    key={resultColumn}>{resultColumn}
                </li>
            );
            if (this.props.autocomplete.threshold)
                allMatches = Filtering.filterMapByPropertyValue(allMatches, (value)=> {
                    return value >= this.props.autocomplete.threshold;
                });
            allMatches = Filtering.sortMapByPropertyValue(allMatches, (value1, value2)=> {
                return value2 - value1
            });
            for (let [match, counter] of allMatches) {
                if (!maxSuggestions || suggestionsInserted < maxSuggestions) {
                    this.displayedSuggestions.push({suggestion: match, suggestionType: resultColumn});
                    suggestions.push(
                        <li onClick={this.onClickHandler.bind(this)}
                            key={resultColumn + "-" + match}
                            className={"suggestion " + (totalSuggestionsInserted == this.state.focusedIndex ? "focused" : "")}
                            data-suggestion={match}
                            data-suggestion-category={resultColumn}>
                            <a>
                                {match.toString()}
                                <span className="results-count">{counter + " result" + (counter > 1 ? "s" : "")}</span>
                            </a>
                        </li>);
                    totalSuggestionsInserted++;
                }
                suggestionsInserted++;
            }
            ;
        }
        ;
        return (
            <ul className="autocomplete dropdown-menu">
                {suggestions}
            </ul>
        );
    }
}