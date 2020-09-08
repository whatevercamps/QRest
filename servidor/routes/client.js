var express = require("express");
var router = express.Router();
const restaurantModel = require("../model/restaurantModel")();
const orderModel = require("../model/orderModel")();

router.get("/getMenuStructure", (req, res, next) => {
  const token = req.query.token;

  const restaurantId = token.split("@@")[0];
  const tableId = token.split("@@")[1];

  restaurantModel
    .connect()
    .then((client) =>
      restaurantModel.getMenuStructure(client, restaurantId, tableId)
    )
    .catch()
    .then((resp) => {
      if (resp && resp.length) {
        res.status(200).json({
          success: true,
          msg: "Menu Structure retrieved ",
          data: resp[0]["menu"],
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "No table retrieved ",
          data: { token: token, restaurantId: restaurantId, tableId: tableId },
        });
      }
    })
    .catch(next);
});

router.post("/makeOrder", (req, res, next) => {
  const order = req.body.order;
  const token = req.body.token;

  const restaurantId = token.split("@@")[0];
  const tableId = token.split("@@")[1];

  orderModel
    .connect()
    .then((client) =>
      orderModel.createOrder(client, order, tableId, restaurantId)
    )
    .then((resp) => {
      console.log("resp", resp);

      if (resp && resp.insertedCount >= 1) {
        /* Make order notification for restaurant */
        restaurantModel
          .connect()
          .then((client) => restaurantModel.getChatIds(client, restaurantId))
          .then((chatsIdsResp) => {
            console.log("chatIds", chatsIdsResp);
            if (chatsIdsResp) {
              res.status(200).json({
                success: true,
                msg: "Order created ",
                data: resp,
              });
            } else throw new Error("failed to notificate restaurant", resp);
          });
        /* End */
      } else throw new Error("failed to authenticate user", resp);
    })
    .catch(next);
});

module.exports = router;
