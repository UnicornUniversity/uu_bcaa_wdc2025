const path = require("path");
const Ajv = require("ajv").default;
const TransactionDao = require("../../dao/transaction-dao");
let dao = new TransactionDao();

let schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

async function GetAbl(req, res) {
  try {
    const ajv = new Ajv();
    const body = req.query.id ? req.query : req.body;

    const valid = ajv.validate(schema, body);
    if (valid) {
      const transactionId = body.id;
      const transaction = await dao.getTransaction(transactionId);
      if (!transaction) {
        res
          .status(400)
          .send({
            error: `transaction with id '${transactionId}' doesn't exist`,
          });
      }
      res.json(transaction);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = GetAbl;
