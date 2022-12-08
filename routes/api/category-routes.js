const router = require("express").Router();
const { Category, Product } = require("../../models");

// This is the  `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories

  try {
    const getAllCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(getAllCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value

  try {
    const getCategoryByID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!getCategoryByID) {
      res.status(404).json(`Sorry category was not found`);
    } else {
      res.status(200).json(getCategoryByID);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  //create a new category
  try {
    const insertCategoryName = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(insertCategoryName);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategoryName = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );

    if (!updateCategoryName[0]) {
      res.status(404).json("Sorry, category id was not found");
      return;
    } else {
      res.status(200).json(updateCategoryName);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCateoryByID = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deleteCateoryByID) {
      res.status(404).json("Sorry, category id was not found");
      return;
    } else {
      res.status(200).json(`Success! Category ${req.params.id} was deleted`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
