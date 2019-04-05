"use strict";
const { db } = require("@arangodb");
const { context } = require("@arangodb/locals");

if (!context.collection("tweets")) {
  db._createDocumentCollection(context.collectionName("tweets"));
}
