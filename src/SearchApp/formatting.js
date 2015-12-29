/**
 * Created by guillaumelebedel on 29/11/15.
 */

let Formatting = {
    ROW_UNIQUE_KEY: "ReactSearchItem",
    MULTIPLE_RESULTS_SPERATOR: ", ",
    addReactKeysToArray: function (arr, base) {
        let id = 0;
        base = base || "ReactKey";
        arr.forEach((obj)=> obj[base] = base + "-" + id++);
    },
    wholeArray: function (arr, customChanges) {
        if (!arr)
            return;
        if (customChanges)
            arr = customChanges(arr);
        this.addReactKeysToArray(arr, this.ROW_UNIQUE_KEY);
        return arr;
    },
    toCellString: function (cell, separator) {
        if (typeof cell !== "object")
            return cell.toString();
        else {
            separator = separator || this.MULTIPLE_RESULTS_SPERATOR
            return this.objToArray(cell).join(separator);
        }
    },
    objToArray: function (cell) {
        if (cell.constructor === Array)
            return cell;
        let res = [];
        for (let cellComponent in cell) {
            if (cell.hasOwnProperty(cellComponent) && cell[cellComponent].toString)
                res.push(cell[cellComponent]);
        }
        return res;
    },
    JSON2CSV: (json)=> {
        let keys = [];
        for (let k in json[0]) keys.push(k);
        let result = keys.join(",") + "\n";
        json.forEach(function(obj){
            keys.forEach(function(k, ix){
                if (ix) result += ",";
                result += obj[k];
            });
            result += "\n";
        });
        return result;
    }
}
export default Formatting;