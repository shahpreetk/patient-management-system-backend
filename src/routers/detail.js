const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Detail = require("../models/detail");

router.post("/details", auth, async (req, res) => {
  const detail = new Detail({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await detail.save();
    res.status(201).send(detail);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/details", auth, async (req, res) => {
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
        path: "details",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.details);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/details/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const detail = await Detail.findOne({ _id, owner: req.user._id });
    if (!detail) {
      return res.status(404).send();
    }
    res.send(detail);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/details/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "caseNumber",
    "mobileNumber",
    "bloodGroup",
    "medicals",
    "height",
    "weight",
    "gender",
  ];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const detail = await Detail.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!detail) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      if (update === "medicals") {
        const date = req.body.medicals[0].date;
        const diagnosis = req.body.medicals[0].diagnosis;
        const prescription = req.body.medicals[0].prescription;
        detail.medicals = detail.medicals.concat({
          date,
          diagnosis,
          prescription,
        });
      } else {
        detail[update] = req.body[update];
      }
    });

    await detail.save();
    res.send(detail);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/details/:id", auth, async (req, res) => {
  try {
    const detail = await Detail.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!detail) {
      return res.status(404).send();
    }
    res.send(detail);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
