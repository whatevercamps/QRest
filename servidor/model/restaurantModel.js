"use strict";

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const MongoUtils = () => {
  const mu = {};

  const dbURL = process.env.DB_URL || "I didn't read the deploy instructions";
  const dbName = process.env.DB_NAME || "I didn't read the deploy instructions";

  const collection = "restaurants";

  const handler = (client, pColl) =>
    client.db(dbName).collection(pColl || collection);

  mu.connect = () => {
    const client = new MongoClient(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return client.connect().catch(function (e) {
      console.log("current dburl", dbURL);
      console.log("catch in connect", e);
      throw e;
    });
  };

  mu.createRestaurant = (client, adminId, pRestaurant) => {
    console.log("params", adminId, pRestaurant);
    let restaurant = pRestaurant;
    restaurant["adminId"] = new ObjectID(adminId);
    return handler(client)
      .insert(restaurant)
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  mu.getRestaurant = (client, restaurantId, shouldCloseClient) => {
    return handler(client)
      .find({ _id: new ObjectID(restaurantId) })
      .toArray()
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        console.log("*****finalizing");
        if (shouldCloseClient) {
          client.close();
        }
      });
  };

  mu.createTables = (client, restaurantId, numberOf, currentIndex) => {
    const tablesForPush = [];

    for (let i = 0; i < numberOf; i++) {
      tablesForPush.push({ id: new ObjectID(), number: currentIndex + i + 1 });
    }

    return handler(client)
      .findOneAndUpdate(
        { _id: new ObjectID(restaurantId) },
        { $push: { tables: { $each: tablesForPush } } },
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

  mu.saveMenuStructure = (client, restaurantId, menuStructure) => {
    return handler(client)
      .findOneAndUpdate(
        { _id: new ObjectID(restaurantId) },
        {
          $set: { menu: menuStructure },
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

  mu.getMenuStructure = (client, restaurantId, tableId) => {
    let query = {};

    try {
      const rId = new ObjectID(restaurantId);
      const tId = new ObjectID(tableId);
      query = { _id: rId, "tables.id": tId };

      console.log("query", query);
    } catch (error) {
      console.log("failed creating ObjectIDs");
      return [];
    }

    return handler(client)
      .find(query)
      .toArray()
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        console.log("*****finalizing");
        client.close();
      });
  };

  mu.registerChatId = (client, phoneNumber, chatId) => {
    const query = { "chefs.phone": phoneNumber };

    return handler(client)
      .findOneAndUpdate(
        query,
        {
          $set: {
            "chefs.$.chatId": chatId,
          },
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
