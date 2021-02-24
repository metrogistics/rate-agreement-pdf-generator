"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createPlaceholderValues = (multiDimenObj = []) => {
    let counter = 1;
    function recursive(nestedArray = []) {
        let fullString = '';
        let foundMaxDepth = false;
        for (const inner of nestedArray) {
            let innerValues = '';
            if (Array.isArray(inner)) {
                fullString += recursive(inner);
            }
            else {
                if (!foundMaxDepth) {
                    fullString += '(';
                    foundMaxDepth = true;
                }
                innerValues = `$${counter}, `;
                counter++;
            }
            fullString += innerValues;
        }
        if (fullString.substr(-2) === ', ') {
            fullString = fullString.slice(0, -2);
        }
        if (foundMaxDepth) {
            fullString = fullString.concat('),');
        }
        return fullString;
    }
    return recursive(multiDimenObj).slice(0, -1);
};
const flatten = (list) => {
    return list.reduce((acc, next) => {
        return acc.concat(Array.isArray(next) ? flatten(next) : next);
    }, []);
};
const createBulkInsert = (multiDimenObj = []) => ({
    valueString: createPlaceholderValues(multiDimenObj),
    values: flatten(multiDimenObj),
});
exports.default = {
    createBulkStatement: createBulkInsert,
};
//# sourceMappingURL=sqlHelper.js.map