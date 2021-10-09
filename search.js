const { client, indexName: index } = require("./config");
const { logTitles } = require("./helpers");

/**
 * Finding matches sorted by relevance (full-text query)
 * `run-func search match title "ice-cream with berries"`
 */
module.exports.match = (field, query, fuzziness) => {
  console.log(`Searching for ${query} in the field ${field}`);
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
  console.log(
    `Searching for ${query} with slop value ${slop} in the field ${field}`
  );
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
  console.log(
    `Searching for ${query} in the field ${field}`
  );
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
  console.log(`Searching for values in the field ${field} equal to ${value}`);
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
  console.log(
    `Searching for values in the ${field} ranging from ${gte} to ${lte}`
  );
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
  console.log(
    `Search for ${value} in the ${field} with fuzziness set to ${fuzziness}`
  );
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