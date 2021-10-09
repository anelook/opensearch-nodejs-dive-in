const { client, indexName: index } = require("./config");
const { logAggs } = require("./helpers");

/**
 * Searching for exact matches of a value in a field.
 * `run-func aggregate field rating`
 */
module.exports.field = (field) => {
    const body = {
        aggs: {
            [field]: {
                terms: {
                    field
                }
            },
        },
    };
    client.search(
        {
            index,
            body,
            size: 0,
        },
        logAggs.bind(this, field)
    );
};

/**
 * Searching for exact matches of a value in a field.
 * `run-func aggregate average rating`
 */
module.exports.average = (field) => {
    const body = {
        aggs: {
            [field]: {
                avg: {
                    field
                }
            }
        },
    };
    client.search(
        {
            index,
            body,
            size: 0,
        },
        logAggs.bind(this, field)
    );
};

/**
 * Searching for exact matches of a value in a field.
 * `run-func aggregate withMatch rating`
 */
module.exports.withMatch = (field, matchField, matchValue) => {
    const body = {
        query: {
            match: {
                [matchField]: matchValue
            }
        },
        aggs: {
            [field]: {
                avg: {
                    field
                }
            }
        },
    };
    client.search(
        {
            index,
            body,
            size: 0,
        },
        logAggs.bind(this, field)
    );
};

/**
 * Searching for exact matches of a value in a field.
 */
// module.exports.aggsFieldAndMatch = (field, value) => {
//   const body = {
//     query: {
//       match: {
//         [field]: value
//       }
//     },
//     aggs: {
//       [field]: {
//         terms: {
//           field
//         }
//       },
//     },
//   };
//   client.search(
//       {
//         index: indexName,
//         body,
//       },
//       logAggs.bind(this, field)
//   );
// };
// run-func aggs.js aggsFieldAndMatch rating 5



//
// /**
//  * Searching for exact matches of a value in a field.
//  * `run-func aggregate withMatch rating`
//  */
// module.exports.aggsFieldAndMatch = (field, matchField, matchValue) => {
//     const body = {
//         query: {
//             match: {
//                 [matchField]: matchValue
//             }
//         },
//         aggs: {
//             [field]: {
//                 terms: {
//                     field
//                 }
//             },
//         },
//     };
//     client.search(
//         {
//             index: indexName,
//             body,
//             size: 0
//         },
//         logAggs.bind(this, field)
//     );
// };
// run-func aggs.js aggsFieldAndMatch rating title beer


/**
 * Searching for exact matches of a value in a field.
 * `run-func aggregate histogram rating 1`
 */
module.exports.histogram = (field, interval) => {
    const body = {
        aggs: {
            [field]: {
                histogram: {
                    field,
                    interval
                }
            },
        },
    };
    client.search(
        {
            index: indexName,
            body,
            size: 0,
        },
        logAggs.bind(this, field)
    );
};

/**
 * Searching for exact matches of a value in a field.
 * `run-func aggregate dateHistogram date year`
 */
module.exports.dateHistogram = (field, interval) => {
    const body = {
        aggs: {
            [field]: {
                date_histogram: {
                    field,
                    interval
                }
            },
        },
    };
    client.search(
        {
            index,
            body,
            size: 0,
        },
        logAggs.bind(this, field)
    );
};


