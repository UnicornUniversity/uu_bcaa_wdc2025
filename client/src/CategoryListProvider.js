import React, { createContext, useContext, useState, useEffect } from "react";

const CategoryListContext = createContext();

export function useCategoryList() {
  const context = useContext(CategoryListContext);
  if (!context) {
    throw new Error(
      "useCategoryList must be used within a CategoryListProvider"
    );
  }
  return context;
}

export default function CategoryListProvider({ children }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'
  const [error, setError] = useState(null);

  const fetchCategorys = async () => {
    setStatus("loading");
    setError(null);

    try {
      // Simulate 2 seconds delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("/category/list");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const categoryData = await response.json();
      setData(categoryData);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Failed to fetch categorys");
      setStatus("error");
    }
  };

  const createCategory = async (categoryData) => {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const createdCategory = await response.json();

      // Refresh the category list after successful creation
      await fetchCategorys();

      return createdCategory;
    } catch (err) {
      setError(err.message || "Failed to create category");
      setStatus("error");
      throw err;
    }
  };

  const updateCategory = async (categoryData) => {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/category/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            errorData.error ||
            `HTTP error! status: ${response.status}`
        );
      }

      const updatedCategory = await response.json();

      // Refresh the category list after successful update
      await fetchCategorys();

      return updatedCategory;
    } catch (err) {
      setError(err.message || "Failed to update category");
      setStatus("error");
      throw err;
    }
  };

  const deleteCategory = async (categoryId) => {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/category/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: categoryId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            errorData.error ||
            `HTTP error! status: ${response.status}`
        );
      }

      // Refresh the category list after successful deletion
      await fetchCategorys();
    } catch (err) {
      setError(err.message || "Failed to delete category");
      setStatus("error");
      throw err;
    }
  };

  useEffect(() => {
    fetchCategorys();
  }, []);

  const categoryMap = {};
  data?.forEach((category) => {
    categoryMap[category.id] = category;
  });

  const value = {
    data,
    categoryMap,
    status,
    error,
    handlerMap: {
      fetchCategorys,
      createCategory,
      updateCategory,
      deleteCategory,
    },
  };

  return (
    <CategoryListContext.Provider value={value}>
      {children}
    </CategoryListContext.Provider>
  );
}
