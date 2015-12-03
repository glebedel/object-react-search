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
export default Formating;