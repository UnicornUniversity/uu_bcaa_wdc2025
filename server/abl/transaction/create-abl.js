const TransactionDao = require("../../dao/transaction-dao");
const CategoryDao = require("../../dao/category-dao.js");

const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    counterparty: { type: "string", maxLength: 150 },
    amount: { type: "number" },
    date: { type: "string", format: "date" },
    note: { type: "string", maxLength: 250 },
    categoryId: { type: "string" },
  },
  required: ["counterparty", "amount", "date", "categoryId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let transaction = req.body;
    const valid = ajv.validate(schema, transaction);

    if (valid) {
      const transactionDao = new TransactionDao();
      const categoryDao = new CategoryDao();

      // validate date
      if (new Date(transaction.date) >= new Date()) {
        res.status(400).json({
          code: "invalidDate",
          message: `date must be current day or a day in the past`,
        });
        return;
      }

      // check if categoryId exists
      const category = categoryDao.getCategory(transaction.categoryId);

      if (!category) {
        res.status(400).json({
          code: "categoryDoesNotExist",
          message: `category with id ${transaction.categoryId} does not exist`,
        });
        return;
      }

      transaction = await transactionDao.createTransaction({
        ...transaction,
        cts: new Date().toISOString(),
      });
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: transaction,
        reason: ajv.errors,
      });
    }

    res.json(transaction);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

module.exports = CreateAbl;
