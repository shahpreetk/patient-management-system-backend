const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Stock = require("../models/stock");

router.post("/stocks", auth, async (req, res) => {
  const stock = new Stock({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await stock.save();
    res.status(201).send(stock);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/stocks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  // if (req.query.completed) {
  //   match.completed = req.query.completed === "true";
  // }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    await req.user
      .populate({
        path: "stocks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.stocks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/stocks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const stock = await Stock.findOne({ _id, owner: req.user._id });
    if (!stock) {
      return res.status(404).send();
    }
    res.send(stock);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/stocks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "_id",
    "name",
    "ticker",
    "buyingDate",
    "buyingPrice",
    "buyingQuantity",
    "stoploss",
    "sellingDate",
    "sellingPrice",
    "sellingQuantity",
    "description",
  ];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const stock = await Stock.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!stock) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      stock[update] = req.body[update];
    });

    await stock.save();
    res.send(stock);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/stocks/:id", auth, async (req, res) => {
  try {
    const stock = await Stock.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!stock) {
      return res.status(404).send();
    }
    res.send(stock);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
