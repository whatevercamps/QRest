var express = require("express");
var router = express.Router();

const restaurantModel = require("../model/restaurantModel")();

const adminModel = require("../model/adminModel")();

router.post("/createAdmin", (req, res) => {
  const user = req.body.user;

  adminModel
    .connect()
    .then((client) => adminModel.createAdmin(client, user))
    .then((resp) => {
      console.log("resp", resp);
      if (resp && resp.insertedCount >= 1)
        res.status(200).json({
          success: true,
          msg: "Admin saved ",
          data: resp,
        });
      else throw new Error("failed to authenticate user", resp);
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        msg: "Failure creating admin user",
        error: err,
      });
    });
});

/* SET site configuration */
router.post("/createRestaurant", function (req, res) {
  const adminId = req.query.adminId;
  const restaurant = req.body.restaurant;
  restaurantModel
    .connect()
    .then((client) =>
      restaurantModel.createRestaurant(client, adminId, restaurant)
    )
    .then((resp1) => {
      if (
        resp1 &&
        resp1.insertedCount >= 1 &&
        resp1.insertedIds &&
        resp1.insertedIds["0"]
      ) {
        adminModel.connect().then((client) =>
          adminModel
            .addRestaurant(client, adminId, resp1.insertedIds["0"])
            .then((resp2) => {
              res.status(200).json({
                success: true,
                msg: "Restaurant saved ",
                data: resp2,
              });
            })
        );
      }
    })

    .catch((err) => {
      return res.status(500).json({
        success: false,
        msg: "Failure creating restaurant",
        error: err,
      });
    });
});

/* SET site configuration */
router.post("/setMenuStructure", function (req, res) {
  const menuStructure = req.body.menuStructure;
  const restaurantId = req.query.restaurantId;
  restaurantModel
    .connect()
    .then((client) =>
      restaurantModel.saveMenuStructure(client, restaurantId, menuStructure)
    )
    .then((resp) => {
      console.log("resp", resp);

      res.status(200).json({
        success: true,
        msg: "Menu Structure saved",
        data: resp,
      });
    });
});

router.post("/createTables", (req, res) => {
  const restaurantId = req.query.restaurantId;
  const numberOfTables = req.query.numberOfTables;
  restaurantModel.connect().then((client) =>
    restaurantModel
      .getRestaurant(client, restaurantId, false)
      .then((restaurant) => {
        console.log("restaurant", restaurant);
        const currentIndex =
          restaurant.length && restaurant[0].tables
            ? restaurant[0].tables.length
            : 0;

        restaurantModel
          .createTables(client, restaurantId, numberOfTables, currentIndex)
          .then((resp) => {
            console.log("resp", resp);
            res
              .status(200)
              .json({
                success: true,
                msg: "Table created saved",
                data: resp,
              })
              .catch((err) => {
                return res.status(500).json({
                  success: false,
                  msg: "Failure creating table",
                  error: err,
                });
              });
          });
      })
  );
});

router.get("/getRestaurants", (req, res, next) => {
  const adminId = req.query.adminId;

  restaurantModel
    .connect()
    .then((client) => restaurantModel.getRestaurantsByAdminId(client, adminId))
    .then((restaurants) => {
      res.status(200).json({
        success: true,
        msg: "Restaurants response",
        data: restaurants,
      });
    })
    .catch(next);
});

module.exports = router;
