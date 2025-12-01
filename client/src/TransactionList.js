import { useState } from "react";
import Header from "./Header";
import Transaction from "./Transaction";
import TransactionModal from "./TransactionModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useTransactionList } from "./TransactionListProvider";
import { useCategoryList } from "./CategoryListProvider";

function TransactionList() {
  const { data, status, error, handlerMap } = useTransactionList();
  const { categoryMap } = useCategoryList();
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenModal = (transaction = null) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  const handleDeleteClick = (transaction) => {
    setTransactionToDelete(transaction);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
      setTransactionToDelete(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!transactionToDelete) return;

    setIsDeleting(true);
    try {
      await handlerMap.deleteTransaction(transactionToDelete.id);
      setShowDeleteModal(false);
      setTransactionToDelete(null);
    } catch (err) {
      // Error is already handled by the provider
      console.error("Failed to delete transaction:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Header onOpenModal={() => handleOpenModal(null)} />
      <div>
        {!data && status === "loading" && <div>Načítám data...</div>}
        {!data && status === "error" && (
          <div>Chyba při načítání dat: {error}</div>
        )}
        {
          <div>
            {!data?.length && status === "success"
              ? "Žádné transakce"
              : data?.map((transaction) => (
                  <Transaction
                    key={transaction.id}
                    transaction={transaction}
                    categoryMap={categoryMap}
                    onEdit={() => handleOpenModal(transaction)}
                    onDelete={() => handleDeleteClick(transaction)}
                  />
                ))}
          </div>
        }
      </div>
      <TransactionModal
        show={showModal}
        onHide={handleCloseModal}
        transaction={selectedTransaction}
      />
      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        transaction={transactionToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default TransactionList;
