/**
 * Created by guillaumelebedel on 29/11/15.
 */
import Formatting from "./formatting.js";
var _ = require('lodash');

var Filtering = {
    orderKeys: function (obj, newOrder) {
        var newObj = {}
        for (var i = 0; i < newOrder.length; i++) {
            if (newOrder[i] in obj)
                newObj[newOrder[i]] = obj[newOrder[i]];
        }
        return newObj;
    },
    notKeysFromCopy: function (objToCopy, keysToKeep) {
        var copy = {};
        if (!keysToKeep || !keysToKeep.length)
            for (let key in objToCopy)
                copy[key] = objToCopy[key];
        else
            for (let key in objToCopy) {
                if (objToCopy.hasOwnProperty(key) && typeof(objToCopy[key]) === "object" && objToCopy[key].constructor !== Array)
                    copy[key] = this.keysFromCopy(objToCopy[key], keysToKeep);
                else if (keysToKeep.includes(key))
                    copy[key] = objToCopy[key];
            }
        return copy;
    },
    keysFromCopy: function (objToCopy, keysToRemove) {
        var copy = {};
        if (!keysToRemove || !keysToRemove.length)
            for (let key in objToCopy)
                copy[key] = objToCopy[key];
        else
            for (let key in objToCopy) {
                if (objToCopy.hasOwnProperty(key) && typeof(objToCopy[key]) === "object" && objToCopy[key].constructor !== Array)
                    copy[key] = this.keysFromCopy(objToCopy[key], keysToRemove);
                else if (!keysToRemove.includes(key))
                    copy[key] = objToCopy[key];
            }
        return copy;
    },
    findInArrayElements(inputToMatch, arr, exactMatch){
        var res = [];
        for (let i = 0; i < arr.length; i++) {
            if ((!exactMatch && arr[i].toString().toLowerCase().includes(inputToMatch)) ||
                (exactMatch && arr[i].toString() == inputToMatch))
                res.push(arr[i]);
        }
        return res;
    },
    getMatchesFromObj(input, singleData, exactMatch){
        var res = new Object(null);
        for (let key in singleData) {
            if (singleData.hasOwnProperty(key) && singleData[key]) {
                if (typeof(singleData[key]) === "object") {
                    let arrayedData = Formatting.objToArray(singleData[key]);
                    if (arrayedData.constructor === Array) {
                        var resArray = this.findInArrayElements(input, arrayedData);
                        if (resArray.length) res[key] = resArray;
                    }
                }
                else if ((!exactMatch && singleData[key].toString().toLowerCase().includes(input)) ||
                    (exactMatch && singleData[key].toString() === input))
                    res[key] = [singleData[key]];
            }
        }
        return res;
    },
    getMatchesFromArrayOfObj(input, arrayData, exactMatch){
        var res = new Object(null);
        for (let i = 0; i < arrayData.length; i++) {
            let singleRes = this.getMatchesFromObj(input, arrayData[i])
            for (let key in singleRes) {
                if (singleRes.hasOwnProperty(key)) {
                    if (!res[key]) res[key] = new Object(null);
                    for (let j = 0; j < singleRes[key].length; j++) {
                        res[key][singleRes[key][j]] = singleRes[key][j] in res[key] ? res[key][singleRes[key][j]] + 1 : 1
                    }
                }
            }
        }
        return res;
    },
    getNewProperties(oldObject, newObject){
        var res = new Object(newObject);
        _.forOwn(newObject, (value, key) => {
            if (!(key in oldObject)) res[key] = newObject[key]
        });
        return res;
    },
    sortObjByPropertyValue(obj, sortCallback){
        let resArray = [];
        _.forOwn(obj, (val, key)=>resArray.push([key, val]));
        resArray.sort((item1, item2)=>sortCallback(item1[1], item2[1]))
        var sortedObj = Object.create(null);
        for (let i = 0; i < resArray.length; i++)
            sortedObj[resArray[i][0]] = resArray[i][1];
        return sortedObj;
    },
    filterObjByPropertyValue(obj, filterCallback){
        let resArray = [];
        _.forOwn(obj, (val, key)=>resArray.push([key, val]));
        resArray = resArray.filter((item)=>filterCallback(item[1]))
        var filteredObj = Object.create(null);
        for (let i = 0; i < resArray.length; i++)
            filteredObj[resArray[i][0]] = resArray[i][1];
        return filteredObj;
    },
    sortMapByPropertyValue(map, sortCallback){
        let resArray = [];
        map.forEach((value, key)=>resArray.push([key, value]));
        resArray.sort((item1, item2)=>sortCallback(item1[1], item2[1]))
        var sortedMap = new Map();
        for (let i = 0; i < resArray.length; i++)
            sortedMap.set(resArray[i][0], resArray[i][1]);
        return sortedMap;
    },
    filterMapByPropertyValue(map, filterCallback){
        let resArray = [];
        map.forEach((value, key)=>resArray.push([key, value]));
        resArray = resArray.filter((item)=>filterCallback(item[1]))
        var filteredMap = new Map();
        for (let i = 0; i < resArray.length; i++)
            filteredMap.set(resArray[i][0], resArray[i][1]);
        return filteredMap;
    },
    objectToMap(obj, deep){
        var map = new Map();
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                if (obj[key].constructor === Object && deep)
                    map.set(key, this.objectToMap(obj[key], deep));
                else
                    map.set(key, obj[key])
        }
        return map;
    },
};

export default Filtering;
