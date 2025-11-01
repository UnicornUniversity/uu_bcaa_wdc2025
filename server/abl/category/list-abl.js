const path = require("path");
const CategoryDao = require("../../dao/category-dao");
let dao = new CategoryDao();

async function ListAbl(req, res) {
  try {
    const categoryList = await dao.listCategories();
    res.json(categoryList);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

module.exports = ListAbl;
