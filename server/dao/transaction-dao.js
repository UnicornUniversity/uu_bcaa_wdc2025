"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(
  __dirname,
  "storage",
  "Transaction.json"
);

class TransactionDao {
  constructor(storagePath) {
    this.TransactionstoragePath = storagePath
      ? storagePath
      : DEFAULT_STORAGE_PATH;
  }

  async createTransaction(Transaction) {
    let TransactionList = await this._loadAllTransactions();
    Transaction.id = crypto.randomBytes(8).toString("hex");
    TransactionList.push(Transaction);
    await wf(
      this._getStorageLocation(),
      JSON.stringify(TransactionList, null, 2)
    );
    return Transaction;
  }

  async getTransaction(id) {
    let Transaction = await this._loadAllTransactions();
    const result = Transaction.find((b) => b.id === id);
    return result;
  }

  async updateTransaction(Transaction) {
    let TransactionList = await this._loadAllTransactions();
    const TransactionIndex = TransactionList.findIndex(
      (b) => b.id === Transaction.id
    );
    if (TransactionIndex < 0) {
      throw new Error(
        `Transaction with given id ${Transaction.id} does not exists`
      );
    } else {
      TransactionList[TransactionIndex] = {
        ...TransactionList[TransactionIndex],
        ...Transaction,
      };
    }
    await wf(
      this._getStorageLocation(),
      JSON.stringify(TransactionList, null, 2)
    );
    return TransactionList[TransactionIndex];
  }

  async deleteTransaction(id) {
    let TransactionList = await this._loadAllTransactions();
    const TransactionIndex = TransactionList.findIndex((b) => b.id === id);
    if (TransactionIndex >= 0) {
      TransactionList.splice(TransactionIndex, 1);
    }
    await wf(
      this._getStorageLocation(),
      JSON.stringify(TransactionList, null, 2)
    );
    return {};
  }

  async listTransactions() {
    let TransactionList = await this._loadAllTransactions();
    return TransactionList;
  }

  async _loadAllTransactions() {
    let TransactionList;
    try {
      TransactionList = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No storage found, initializing new one...");
        TransactionList = [];
      } else {
        throw new Error(
          "Unable to read from storage. Wrong data format. " +
            this._getStorageLocation()
        );
      }
    }
    return TransactionList;
  }

  _getStorageLocation() {
    return this.TransactionstoragePath;
  }
}

module.exports = TransactionDao;
