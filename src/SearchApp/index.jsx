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
    arr.forEach((obj)=> {
        flattenMatchResults(obj);
        obj["DATE UPDATED"] = new Date(obj["DATE UPDATED"]).toLocaleDateString("en-GB")
    });
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
                             exactMatch={false}
                             columnsToDisplay={["FILENAME", "client", "environment", "campaign", "matches", "provider", "version", "DATE UPDATED", "path"]}
                             rowKey={"path"}
                             storeConfig={"ReactReport"}
                             notSearchable={["path"]}
                             rowsLimiter={100}
                             exporters={["csv", "json", "pdf"]}
            />
    </div>, document.getElementById('searchApp'));

