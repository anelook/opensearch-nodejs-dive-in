/**
 * Logging result body, used in callbacks.
 */
module.exports.logBody = (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result.body);
    }
};

/**
 * Parsing and logging list of titles from the result, used in callbacks.
 */
module.exports.logTitles = (error, result) => {
    if (error) {
        console.error(error);
    } else {
        const hits = result.body.hits.hits;
        console.log(`Number of returned results is ${hits.length}`);
        console.log(hits.map((hit) => hit._source.title));
    }
};

module.exports.logAggs = (field, error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result.body.aggregations[field]);
    }
};

module.exports.logResultBody = (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result.body);
    }
};