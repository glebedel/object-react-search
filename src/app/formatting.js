/**
 * Created by guillaumelebedel on 29/11/15.
 */
import Filtering from './filtering.js';

var Formating = {
    ROW_UNIQUE_KEY: "ReactSearchItem",
    addReactKeysToArray: function (arr, base) {
        let id = 0;
        base = base || "ReactKey";
        arr.forEach((obj)=> obj[base] = base + "-" + id++);
    },
    wholeArray: function (arr) {
        if (!arr)
            return;
        this.addReactKeysToArray(arr, this.ROW_UNIQUE_KEY);
        return arr;
    }
}


/*var Formating = {
 flattenMatchResults: function (obj) {
 if (obj["matches"]) {
 for (var match in obj["matches"]) {
 obj["provider"] = obj["matches"][match]["provider"] || "";
 obj["version"] = obj["matches"][match]["version"] || "";
 }
 obj["matches"] = Object.keys(obj["matches"]).join(",");
 }
 },
 order: function (obj) {
 return Filtering.orderKeys(obj, ["FILENAME", "client", "environment", "campaign", "matches", "provider", "version", "DATE UPDATED", "path"])
 },
 wholeArray: function(allFiles){
 var formated = Filtering.objectToArray(allFiles).map(function(obj) {
 this.flattenMatchResults(obj);
 return this.order(obj);
 }.bind(this));
 return formated;
 }
 }*/
export default Formating;