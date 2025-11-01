const TransactionDao = require("../../dao/transaction-dao");
const CategoryDao = require("../../dao/category-dao.js");

const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

let schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 16, maxLength: 16 },
    counterparty: { type: "string" },
    amount: { type: "number" },
    date: { type: "string", format: "date" },
    note: { type: "string" },
    categoryId: { type: "string" },
  },
  required: ["id"],
};

async function UpdateAbl(req, res) {
  try {
    let transaction = req.body;
    const valid = ajv.validate(schema, transaction);

    if (valid) {
      const transactionDao = new TransactionDao();
      const categoryDao = new CategoryDao();

      // validate date
      if (transaction.date && new Date(transaction.date) >= new Date()) {
        res.status(400).json({
          code: "invalidDate",
          message: `date must be current day or a day in the past`,
        });
        return;
      }

      // validate category
      if (transaction.category) {
        const category = categoryDao.getCategory(updatedTransaction.categoryId);
        if (!category) {
          res.status(400).json({
            code: "categoryDoesNotExist",
            message: `Category with id ${updatedTransaction.categoryId} does not exist`,
          });
          return;
        }
      }

      transaction = await transactionDao.updateTransaction(transaction);
      return res.json(transaction);
    } else {
      return res.status(400).send({
        errorMessage: "validation of input failed",
        params: transaction,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    console.log(e);
    if (e.message.startsWith("transaction with given id")) {
      return res.status(400).json({ error: e.message });
    }
    return res.status(500).send(e);
  }
}

module.exports = UpdateAbl;
