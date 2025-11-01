"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "Category.json");

class CategoryDao {
  constructor(storagePath) {
    this.CategoriestoragePath = storagePath
      ? storagePath
      : DEFAULT_STORAGE_PATH;
  }

  async createCategory(Category) {
    let CategoryList = await this._loadAllCategories();
    Category.id = crypto.randomBytes(8).toString("hex");
    CategoryList.push(Category);
    await wf(this._getStorageLocation(), JSON.stringify(CategoryList, null, 2));
    return Category;
  }

  async getCategory(id) {
    let Category = await this._loadAllCategories();
    const result = Category.find((b) => b.id === id);
    return result;
  }

  async updateCategory(Category) {
    let CategoryList = await this._loadAllCategories();
    const CategoryIndex = CategoryList.findIndex((b) => b.id === Category.id);
    if (CategoryIndex < 0) {
      throw new Error(`Category with given id ${Category.id} does not exists`);
    } else {
      CategoryList[CategoryIndex] = {
        ...CategoryList[CategoryIndex],
        ...Category,
      };
    }
    await wf(this._getStorageLocation(), JSON.stringify(CategoryList, null, 2));
    return CategoryList[CategoryIndex];
  }

  async deleteCategory(id) {
    let CategoryList = await this._loadAllCategories();
    const CategoryIndex = CategoryList.findIndex((b) => b.id === id);
    if (CategoryIndex >= 0) {
      CategoryList.splice(CategoryIndex, 1);
    }
    await wf(this._getStorageLocation(), JSON.stringify(CategoryList, null, 2));
    return {};
  }

  async listCategories() {
    let CategoryList = await this._loadAllCategories();
    return CategoryList;
  }

  async _loadAllCategories() {
    let CategoryList;
    try {
      CategoryList = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No storage found, initializing new one...");
        CategoryList = [];
      } else {
        throw new Error(
          "Unable to read from storage. Wrong data format. " +
            this._getStorageLocation()
        );
      }
    }
    return CategoryList;
  }

  _getStorageLocation() {
    return this.CategoriestoragePath;
  }
}

module.exports = CategoryDao;
