const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const getAllTagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(getAllTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const getTagDataByID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!getTagDataByID) {
      res.status(404).json("Sorry tag id was not found");
      return;
    } else {
      res.status(200).json(getTagDataByID);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const addNewTag = await Tag.create({ tag_name: req.body.tag_name });
    res.status(200).json(addNewTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagName = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    if (!updateTagName[0]) {
      res.status(404).json("Sorry, tag id was not found");
      return;
    } else {
      res.status(200).json(updateTagName);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTagByID = await Tag.destroy({ where: { id: req.params.id } });
    if (!deleteTagByID) {
      res.status(404).json("Sorry, tag id was not found");
      return;
    } else {
      res.status(200).json(`Success! tag ${req.params.id} was deleted`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
