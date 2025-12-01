import TransactionList from "./TransactionList";
import TransactionListProvider from "./TransactionListProvider";
import CategoryListProvider from "./CategoryListProvider";

function App() {
  return (
    <div style={{ padding: "16px 32px" }}>
      <TransactionListProvider>
        <CategoryListProvider>
          <TransactionList />
        </CategoryListProvider>
      </TransactionListProvider>
    </div>
  );
}

export default App;
