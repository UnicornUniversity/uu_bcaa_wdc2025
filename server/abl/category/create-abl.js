const CategoryDao = require("../../dao/category-dao");

const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    desc: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    const body = req.body;
    const valid = ajv.validate(schema, body);

    let category;
    if (valid) {
      // create new category in DB
      const categoryDao = new CategoryDao();
      category = await categoryDao.createCategory({
        ...body,
        cts: new Date().toISOString(),
      });
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: req.body,
        reason: ajv.errors,
      });
    }

    res.json(category);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

module.exports = CreateAbl;
