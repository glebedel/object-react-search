/**
 * Created by guillaumelebedel on 11/12/15.
 */
import React from 'react';
import Filtering from '../filtering.js';
var _ = require("lodash");

export default class AutoCompleteSuggestions extends React.Component {
    static defaultProps = {suggestions: {}, autocompleteThreshold:1}
    static propTypes = {suggestions: React.PropTypes.object}

    constructor(props) {
        super(props);
    }
    onClickHandler(event){
        this.props.changeSearchBar(event.target.closest('li').dataset.suggestion)
    }
    render() {
        var suggestions = [];
        let threshold = this.props.autocompleteThreshold;
        _.forOwn(this.props.suggestions, (allMatches, resultColumn) => {
             let counter = 0;
             suggestions.push(<span key={resultColumn}>{resultColumn}</span>);
             allMatches = Filtering.filterObjByPropertyValue(allMatches, (value)=>{return value >= threshold});
             allMatches = Filtering.sortObjByPropertyValue(allMatches, (value1, value2)=>{return value1 < value2});
            _.forOwn(allMatches, (counter, match) => {
                if (this.props.autocompleteLimit && counter++ < this.props.autocompleteLimit)
                suggestions.push(<li key={match} data-suggestion={match}>
                        <a onClick={this.onClickHandler.bind(this)} >{match.toString()}
                            <small> - {counter + " result" + (counter > 1 ? "s" : "")}</small>
                        </a>
                    </li>);
            });
        });
        if (this.props.autocompleteLimit) suggestions = _.slice(suggestions, 0, this.props.autocompleteLimit);
        return (
            <ul className="autocomplete dropdown-menu">
                {suggestions}
            </ul>
        );
    }
}