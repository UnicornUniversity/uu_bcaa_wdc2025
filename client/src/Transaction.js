function Transaction({ transaction, categoryMap }) {
  return (
    <div
      style={{
        padding: "8px",
        border: "1px solid grey",
        borderRadius: "8px",
        background: transaction.amount < 0 ? "#FAA0A0" : "#80EF80",
      }}
    >
      {transaction.counterparty}{" "}
      {new Date(transaction.date).toLocaleDateString("cs")}{" "}
      {transaction.amount.toLocaleString("cs")}{" "}
      {categoryMap[transaction.categoryId].name}
    </div>
  );
}

export default Transaction;
