const { client, indexName: index } = require("./config");
const { logTitles } = require("./helpers");

/**
 * Finding matches sorted by relevance (full-text query)
 * `run-func search match title "ice-cream with berries"`
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
 * `run-func search phrase title "beer cheese"`
 */
module.exports.phrase = (field, query) => {
  const body = {
    query: {
      match_phrase: {
        [field]: {
          query
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
 * `run-func search queryString ingredients "+beer -garlic -cheese (lime | ginger)"`
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
 * `run-func search term sodium 0`
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
 * `run-func search range sodium 0 100`
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
 * `run-func search boolean`
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