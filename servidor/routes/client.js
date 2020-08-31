var express = require("express");
var router = express.Router();
const restaurantModel = require("../model/restaurantModel")();

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

// router.post("makeOrder", (req, res) => {
//   products = req.body.products;
// });

module.exports = router;
