const { client, indexName: index } = require("./config");
const { logTitles } = require("./helpers");

/**
 * Finding matches sorted by relevance (full-text query)
 * `run-func search match title "ice-cream with berries"`
 */
module.exports.match = (field, query, fuzziness) => {
  const body = {
    query: {
      match: {
        [field]: {
          query,
          fuzziness,
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
 * `run-func search phrase directions "pizza pineapple" 10`
 */
module.exports.phrase = (field, query, slop) => {
  const body = {
    query: {
      match_phrase: {
        [field]: {
          query,
          slop,
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
 * `run-func search queryString ingredients "(salmon|tuna) +tomato -onion"`
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
      body,
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
 * Specifying fuzziness to account for typos and misspelling (term-level query)
 * `run-func search fuzzyTerm title pinapple 2`
 */
module.exports.fuzzyTerm = (field, value, fuzziness) => {
  const query = {
    query: {
      fuzzy: {
        [field]: {
          value,
          fuzziness,
        },
      },
    },
  };
  client.search(
    {
      index,
      body: query,
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
        must: [
          { match: { categories: "Quick & Easy" } },
          { match: { title: "beer" } },
        ],
        // must_not: { match: { ingredients: "garlic" } },
        filter: [{ range: { rating: { gte: 4 } } }],
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