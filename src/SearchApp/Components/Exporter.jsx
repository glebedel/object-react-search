/**
 * Created by guillaumelebedel on 10/12/15.
 */
import React from 'react';

export default class Exporter extends React.Component {
    static defaultProps = {formats: []}
    static propTypes = {}

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.formats.length)
            return (<div></div>);
        else
            return (
                <div></div>
            );
    }
}