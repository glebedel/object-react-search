/**
 * Created by guillaumelebedel on 11/12/15.
 */
import React from 'react';
var _ = require("lodash");

export default class AutoCompleteSuggestions extends React.Component {
    static defaultProps = {suggestions: {}}
    static propTypes = {suggestions: React.PropTypes.object}

    constructor(props) {
        super(props);
    }

    render() {
        var suggestions = [];
        _.forOwn(this.props.suggestions, (allMatches, resultColumn) => {
             suggestions.push(<span key={resultColumn}>{resultColumn}</span>);
            _.forOwn(allMatches, (counter, match) => {
                suggestions.push(<li key={match}>
                        <a>{match.toString()}
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