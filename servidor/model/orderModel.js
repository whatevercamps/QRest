"use strict";

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const MongoUtils = () => {
  const mu = {};

  const dbURL = process.env.DB_URL || "I didn't read the deploy instructions";
  const dbName = process.env.DB_NAME || "I didn't read the deploy instructions";

  const collection = "orders";

  const handler = (client, pColl) =>
    client.db(dbName).collection(pColl || collection);

  mu.connect = () => {
    const client = new MongoClient(dbURL, { useNewUrlParser: true });
    return client.connect().catch(function (e) {
      console.log("current dburl", dbURL);
      console.log("catch in connect", e);
      throw e;
    });
  };

  mu.createOrder = (client, order, tableId, restaurantId) => {
    return handler(client)
      .insert({
        order: order,
        tableId: new ObjectID(tableId),
        restaurantId: new ObjectID(restaurantId),
      })
      .catch(function (e) {
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  return mu;
};

module.exports = MongoUtils;
