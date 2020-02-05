const express = require("express");
const planner = require("../graphql/planner")
const router = express.Router();

router.post("/", async (req, res) => {
  planner.getPlans(req.body)
  .then(data => res.json(data));
})

module.exports = router;
