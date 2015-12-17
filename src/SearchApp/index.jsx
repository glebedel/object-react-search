import React from 'react';
import {render} from 'react-dom';
import FilterableDataTable from './Components/FilterableDataTable.jsx';

var customChanges = function (arr) {
    var flattenMatchResults = function (obj) {
        if (obj["matches"]) {
            for (var match in obj["matches"]) {
                obj["provider"] = obj["matches"][match]["provider"] || "";
                obj["version"] = obj["matches"][match]["version"] || "";
            }
            obj["matches"] = Object.keys(obj["matches"]);
        }
    };
    var objectToArray = function (objOfObjs, keepKey) {
        var res = [];
        for (let obj in objOfObjs) {
            if (objOfObjs.hasOwnProperty(obj)) {
                if (keepKey && typeof(keepKey) === "string") {
                    let extension = Object.create(null);
                    extension[keepKey] = obj;
                    res.push(Object.assign(objOfObjs[obj], extension));
                }
                else
                    res.push(objOfObjs[obj]);
            }
        }
        return res;
    }
    arr = objectToArray(arr);
    let d = new Date();
    for (let i = 0; i < arr.length;i++){
        flattenMatchResults(arr[i]);
        d.setTime(Date.parse(arr[i]["DATE UPDATED"]));
        let dt = d.getDate().toString();
        let mm = (d.getMonth() + 1).toString();
        dt = dt.length === 1 ? "0" + dt : dt;
        mm = mm.length === 1 ? "0" + mm : mm;
        arr[i]["DATE UPDATED"] = dt +"/" + mm +"/" + (1900 + d.getYear());
    }
    return arr;
}

render(
    <div>
        <div className="main-title">
            <h1>React Reporting</h1>
        </div>
        <FilterableDataTable source="/data_files/integrations.json"
                             customDataChanges={customChanges}
                             displayColumnsToggler={true}
                             columnsToDisplay={["FILENAME", "client", "environment", "campaign", "matches", "provider", "version", "DATE UPDATED", "path"]}
                             notSearchable={["path"]}
                             rowKey={"path"}
                             sort={{sortable:true, default: "client"}}
//                             rowsLimiter={1000}
                             storeConfig={{baseName:"ReactReport", showResetButton: true}}
                             autocomplete={{show: true, limit:4, threshold:1}}
                             searchType={"normal"}
                             exactMatch={false}
                             exporters={["csv", "json", "pdf"]}
            />
    </div>, document.getElementById('searchApp'));

