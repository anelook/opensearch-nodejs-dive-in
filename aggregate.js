const { client, indexName: index } = require("./config");
const { logAggs } = require("./helpers");

/**
 * Get metric aggregations for the field
 * Examples: stats, extended_stats, percentiles, terms
 * `run-func aggregate metric avg rating`
 */
module.exports.metric = (metric, field) => {
    const body = {
        aggs: {
            [field]: { // aggregation name
                [metric]: { // aggregation function
                    field
                }
            }
        },
        // query: {
        //     match: {
        //         [matchField]: matchValue
        //     }
        // },
    };
    client.search(
        {
            index,
            body,
            size: 0, // we're not interested in `hits`
        },
        logAggs.bind(this, field)
    );
};

/**
 * Histogram with interval
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
            index,
            body,
            size: 0,
        },
        logAggs.bind(this, field)
    );
};

/**
 * Date histogram with interval
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

/**
 * Date histogram with number of buckets
 * `run-func aggregate autoDateHistogram date 3`
 */
module.exports.autoDateHistogram = (field, buckets) => {
    const body = {
        aggs: {
            [field]: {
                auto_date_histogram: {
                    field,
                    buckets
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


