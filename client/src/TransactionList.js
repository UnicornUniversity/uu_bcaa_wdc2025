import Header from "./Header";
import Transaction from "./Transaction";

function TransactionList() {
  const transactionList = [
    {
      counterparty: "Shell",
      amount: 3000,
      date: "2025-10-10",
      note: "benzín 36l",
      categoryId: "0e16b70bf887420e",
      cts: "2025-11-01T10:22:46.529Z",
      id: "132fabc2ad3b9c9a",
    },
    {
      counterparty: "RobinOil",
      amount: -1300,
      date: "2025-10-30",
      note: "benzín 32l",
      categoryId: "78fb937258df7e26",
      cts: "2025-11-01T15:45:50.643Z",
      id: "3b3abc8b28f16a86",
    },
    {
      counterparty: "Lékárna",
      amount: -800,
      date: "2025-11-01",
      note: "vitamíny",
      categoryId: "71518d7de8cced63",
      cts: "2025-11-01T16:58:32.475Z",
      id: "8e8603e7e61aafcf",
    },
  ];

  const categoryList = [
    {
      name: "zábava",
      id: "0e16b70bf887420e",
    },
    {
      name: "lékař",
      desc: "všechny útraty za léky, návštěvy lékaře apod.",
      id: "71518d7de8cced63",
    },
    {
      name: "mzda",
      desc: "všechny pravidelné příjmy ze zaměstnání",
      cts: "2025-10-11T16:46:25.043Z",
      id: "535f04b8098940cc",
    },
    {
      name: "palivo",
      cts: "2025-11-01T15:17:03.934Z",
      id: "78fb937258df7e26",
    },
  ];

  const categoryMap = {};
  categoryList.forEach((category) => {
    categoryMap[category.id] = category;
  });

  return (
    <div>
      <Header />
      <div>
        {transactionList.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            categoryMap={categoryMap}
          />
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
