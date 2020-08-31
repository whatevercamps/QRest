"use strict";

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const MongoUtils = () => {
  const mu = {};

  const dbURL = process.env.DB_URL || "I didn't read the deploy instructions";
  const dbName = process.env.DB_NAME || "I didn't read the deploy instructions";

  const collection = "admins";

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

  mu.createAdmin = (client, user) => {
    let admin = user;
    admin["validated"] = false;
    return handler(client)
      .insert(admin)
      .catch(function (e) {
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  mu.addRestaurant = (client, adminId, restaurantId) => {
    return handler(client)
      .findOneAndUpdate(
        { _id: new ObjectID(adminId) },
        {
          $push: { restaurants: new ObjectID(restaurantId) },
        },
        {
          returnOriginal: false,
        }
      )
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  return mu;
};

module.exports = MongoUtils;
