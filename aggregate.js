const { client, indexName: index } = require("./config");
const { logAggs } = require("./helpers");

/**
 * Get metric aggregations for the field
 * Examples: stats, extended_stats, percentiles, terms
 * run-func aggregate metric avg rating
 */
module.exports.metric = (metric, field) => {
  const body = {
    aggs: {
      [`aggs-for-${field}`]: { //aggs name
        [metric]: { // aggregation type
          field,
        },
      },
    },
    // try mixing with search queries!
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
    logAggs.bind(this, `aggs-for-${field}`)
  );
};

/**
 * Histogram with interval
 * run-func aggregate histogram rating 1
 */
module.exports.histogram = (field, interval) => {
  const body = {
    aggs: {
      [`aggs-for-${field}`]: {
        histogram: { // aggregation type
          field,
          interval,
        },
      },
    },
  };
  client.search(
    {
      index,
      body,
      size: 0,
    },
    logAggs.bind(this, `aggs-for-${field}`)
  );
};

/**
 * Date histogram with interval
 * run-func aggregate dateHistogram date year
 */
module.exports.dateHistogram = (field, interval) => {
  const body = {
    aggs: {
      [`aggs-for-${field}`]: {
        date_histogram: {
          field,
          interval,
        },
      },
    },
  };
  client.search(
    {
      index,
      body,
      size: 0,
    },
    logAggs.bind(this, `aggs-for-${field}`)
  );
};

/**
 * Date histogram with number of buckets
 * run-func aggregate autoDateHistogram date 3
 */
module.exports.autoDateHistogram = (field, buckets) => {
  const body = {
    aggs: {
      [`aggs-for-${field}`]: {
        auto_date_histogram: {
          field,
          buckets,
        },
      },
    },
  };
  client.search(
    {
      index,
      body,
      size: 0,
    },
    logAggs.bind(this, `aggs-for-${field}`)
  );
};


/**
 * Calculating the moving average of number of added recipes across years
 * run-func aggregate movingAverage
 */
module.exports.movingAverage = () => {
  const body = {
    aggs: {
      recipes_per_year: { // 1. date histogram
        date_histogram: {
          field: "date",
          interval: "year",
        },
        aggs: {
          recipes_count: { // 2. metric aggregation to count new recipes
            value_count: { // aggregate by number of documents with field 'date'
              field: "date"
            },
          },
          moving_average: {
            moving_fn: { // 3. glue the aggregations
              script: "MovingFunctions.unweightedAvg(values)", // 4. a built-in function
              shift: 1, // 5. take into account the existing year as part of the window
              window: 3, // 6. set size of the moving window
              buckets_path: "recipes_count",
              gap_policy: "insert_zeros", // account for years where no recipes were
                                          // added and replace null value with zeros
            },
          },
        },
      },
    },
  };
  client.search(
      {
        index,
        body,
        size: 0,
      },
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(result.body.aggregations["recipes_per_year"].buckets);
        }
      }
  );
};