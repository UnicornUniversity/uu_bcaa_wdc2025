const path = require("path");
const TransactionDao = require("../../dao/transaction-dao");
let dao = new TransactionDao();

async function ListAbl(req, res) {
  try {
    const transactionList = await dao.listTransactions();
    res.json(transactionList);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

module.exports = ListAbl;
