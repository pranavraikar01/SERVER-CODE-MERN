const express = require("express");

const dataController = require("./../controllers/dataController");

const router = express.Router();

router
  .route("/datafetch")
  .get(dataController.fetchData)
  .post(dataController.createData);

router.route("/filterByEndYear").get(dataController.filterByEndYear);

router.route("/filterByTopics").get(dataController.filterByTopics);

router.route("/filterBySector").get(dataController.filterBySector);

router.route("/filterByRegion").get(dataController.filterByRegion);

module.exports = router;
