/**
 * Created by guillaumelebedel on 29/11/15.
 */

var Filtering = {
    orderKeys: function (obj, newOrder) {
        var newObj = {}
        for (var i = 0; i < newOrder.length; i++) {
            if (newOrder[i] in obj)
                newObj[newOrder[i]] = obj[newOrder[i]];
        }
        return newObj;
    },
    notKeysFromCopy: function (objToCopy, keysToKeep, toLowerCase) {
        var copy = {};
        if (!keysToKeep || !keysToKeep.length)
            for (let key in objToCopy)
                copy[key] = objToCopy[key];
        else
            for (let key in objToCopy) {
                if (objToCopy.hasOwnProperty(key) && typeof(objToCopy[key]) === "object")
                    copy[key] = this.keysFromCopy(objToCopy[key], keysToKeep, toLowerCase);
                else if (keysToKeep.includes(key))
                    copy[key] = toLowerCase && typeof(objToCopy[key]) === "string" ? objToCopy[key].toLowerCase() : objToCopy[key];
            }
        return copy;
    },
    keysFromCopy: function (objToCopy, keysToRemove, toLowerCase) {
        var copy = {};
        if (!keysToRemove || !keysToRemove.length)
            for (let key in objToCopy)
                copy[key] = objToCopy[key];
        else
            for (let key in objToCopy) {
                if (objToCopy.hasOwnProperty(key) && typeof(objToCopy[key]) === "object")
                    copy[key] = this.keysFromCopy(objToCopy[key], keysToRemove, toLowerCase);
                else if (!keysToRemove.includes(key))
                    copy[key] = objToCopy[key];
            }
        return copy;
    }
};

export default Filtering;
