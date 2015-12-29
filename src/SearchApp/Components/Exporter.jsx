/**
 * Created by guillaumelebedel on 10/12/15.
 */
import React from 'react';
import Formatting from '../formatting.js';

export default class Exporter extends React.Component {
    static defaultProps = {types: [], data: []}
    static propTypes = {}

    exporters = {
        "csv": {
            method:()=>window.open("data:text/csv;charset=utf-8," + escape(Formatting.JSON2CSV(this.props.getData()))),
            icon: "",
            classes: "label label-info",
            matches: ["csv", "CSV", "EXCEL", "excel"]
        },
        "json": {
            method: ()=>window.open("data:text/json;charset=utf-8," + escape(JSON.stringify(this.props.getData()))),
            icon: "",
            classes: "label label-info",
            matches: ["json", "JSON", "JAVASCRIPT", "javascript", "JavaScript"]
        }
    }
    findMatchingExporter(type){
        for (let exporter in this.exporters){
            if (this.exporters[exporter].matches.includes(type))
                return this.exporters[exporter];
        }
    }
    constructor(props) {
        super(props);
    }

    render() {
        var exporters = this.props.types.map((type)=> {
            let matchingExporter = this.findMatchingExporter(type)
            if (matchingExporter)
            return (<li
                key={type}
                className={"exporter " + matchingExporter.classes}
                onClick={matchingExporter.method}
                >{type}
            </li>);
        });
        return (
            <div><ul className="exporters">{exporters}</ul></div>
        );
    }
}