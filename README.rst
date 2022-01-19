Hands-on material for session on how to start working with OpenSearch and NodeJS
================================================================================

Additional written guidance can be also found in articles `how to write search queries with OpenSearch and NodeJS <https://developer.aiven.io/docs/products/opensearch/howto/opensearch-and-nodejs.html>`_ and `how to use aggregations with OpenSearch and NodeJS <https://developer.aiven.io/docs/products/opensearch/howto/opensearch-aggregations-and-nodejs.html>`_.

Prerequisites
-------------

To run examples from this repository you'll need:

1. An OpenSearch cluster. You can `set it up manually <https://opensearch.org/downloads.html>`_ or you can use a fully managed service, such as `Aiven for OpenSearch <https://aiven.io/opensearch>`_.
2. NodeJS and npm. If you don’t have NodeJS or npm installed, follow `these instructions <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>`_.
3. Curiosity and patience 😉

Running locally
---------------

1. Clone the repository and install the dependencies::

    npm install

2. Copy .env.example, rename to .env and there the service_uri of your OpenSearch cluster.

3. Download full_format_recipes from `Kaggle <https://www.kaggle.com/hugodarwood/epirecipes?select=full_format_recipes.json>`_. Unzip and copy the JSON file to the root folder of this project.

4. Install ``run-func`` to run javascript methods from command line with more convenience::

    npm i -g run-func

You're all set! Retrieve the list of available indices by running in your terminal

::

    run-func search getIndices


How to use
----------

1. Make sure that you have `full_format_recipes.json` at the root level of the repository and run command to inject data::

    run-func index injectData

Wait till the data is indexed. Can take 15-20 seconds.

2. Check `search.js` and `aggregate.js` for examples you can run. Every method contains a terminal command sample that you can try.

::

    run-func search match title "garlic onion cake"

::

    run-func aggregate field rating


Structure of this repository
----------------------------

`index.js` - working with index, injecting data

`search.js` - examples of different types of search queries

`aggregate.js` - examples of different types of aggregation queries

`config.js` and `helpers.js` contain operations required to connect to the cluster and log responses.


License
-------

This work is licensed under the Apache License, Version 2.0. Full license text is available in the LICENSE file and at http://www.apache.org/licenses/LICENSE-2.0.txt





