require("dotenv").config();
const { Client } = require("@opensearch-project/opensearch");

// full_format_recipes.json taken from
// https://www.kaggle.com/hugodarwood/epirecipes?select=full_format_recipes.json
const recipes = require("./full_format_recipes.json");

module.exports.client = new Client({
    node: process.env.SERVICE_URI,
});

module.exports.indexName = "recipes";

