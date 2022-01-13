const { client, indexName: index } = require("./config");
const { logTitles } = require("./helpers");

/**
 * Finding matches sorted by relevance (full-text query)
 * run-func search match title "soups with beer and garlic"
 * run-func search match title "pizza salad and cheese"
 */
module.exports.match = (field, query) => {
  const body = {
    query: {
      match: {
        [field]: {
          query,
        },
      },
    },
  };
  client.search(
    {
      index,
      body,
    },
    logTitles
  );
};

/**
 * Matching a phrase (full-text query)
 * run-func search phrase title 'pasta with cheese'
 * run-func search phrase title 'milk chocolate cake'
 */
module.exports.phrase = (field, query, slop) => {
  const body = {
    query: {
      match_phrase: {
        [field]: {
          query,
          slop
        },
      },
    },
  };
  client.search(
    {
      index,
      body,
    },
    logTitles
  );
};

/**
 * Using special operators within a query string and a size parameter (full-text query)
 * run-func search queryString title '+(dessert | cake) -garlic  (mango | caramel | cinnamon)'
 * run-func search queryString title '+(salad | soup) -broccoli  (tomato | apple)'
 */
module.exports.queryString = (field, query) => {
  const body = {
    query: {
      query_string: {
        default_field: field,
        query,
      },
    },
  };
  client.search(
    {
      index,
      body
    },
    logTitles
  );
};

/**
 * Searching for exact matches of a value in a field (term-level query)
 * run-func search term sodium 0
 */
module.exports.term = (field, value) => {
  const body = {
    query: {
      term: {
        [field]: value,
      },
    },
  };
  client.search(
    {
      index,
      body,
    },
    logTitles
  );
};

/**
 * Searching for a range of values in a field (term-level query)
 * gt (greater than)
 * gte (greater than or equal to)
 * lt (less than)
 * lte (less than or equal to)
 * run-func search range sodium 0 100
 */
module.exports.range = (field, gte, lte) => {
  const body = {
    query: {
      range: {
        [field]: {
          gte,
          lte,
        },
      },
    },
  };
  client.search(
    {
      index,
      body,
    },
    logTitles
  );
};


/**
 * Combining several queries together (boolean query)
 * run-func search boolean
 */
module.exports.boolean = () => {
  const body = {
    query: {
      bool: {
        filter: [{ range: { rating: { gte: 4 } } }],
        must: [
          { match: { categories: "Quick & Easy" } },
          { match: { title: "beer" } },
        ],
        should: [
          { match: { categories: "Cocktails" } },
        ],
        must_not: { match: { ingredients: "garlic" } }
      },
    },
  };
  client.search(
    {
      index,
      body,
    },
    logTitles
  );
};