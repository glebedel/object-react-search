/**
 * Created by guillaumelebedel on 29/11/15.
 */

var Formatting = {
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
            let res = "";
            for (let cellComponent in cell) {
                if (cell.hasOwnProperty(cellComponent) && cell[cellComponent].toString)
                    res += (res ? separator : "") + cell[cellComponent].toString();
            }
            return res;
        }
    }
}
export default Formatting;