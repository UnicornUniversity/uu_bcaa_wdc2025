import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useTransactionList } from "./TransactionListProvider";
import { useCategoryList } from "./CategoryListProvider";

function TransactionModal({ show, onHide, transaction = null }) {
  const { handlerMap } = useTransactionList();
  const { data: categories } = useCategoryList();
  const [formData, setFormData] = useState({
    counterparty: "",
    amount: "",
    date: "",
    note: "",
    categoryId: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = transaction !== null;

  useEffect(() => {
    if (show) {
      if (transaction) {
        // Edit mode - populate form with transaction data
        setFormData({
          counterparty: transaction.counterparty || "",
          amount: transaction.amount || "",
          date: transaction.date || "",
          note: transaction.note || "",
          categoryId: transaction.categoryId || "",
        });
      } else {
        // Create mode - reset form
        setFormData({
          counterparty: "",
          amount: "",
          date: "",
          note: "",
          categoryId: "",
        });
      }
      setError(null);
    }
  }, [show, transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? (value === "" ? "" : Number(value)) : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isEditMode) {
        // Update transaction
        await handlerMap.updateTransaction({
          id: transaction.id,
          ...formData,
        });
      } else {
        // Create transaction
        await handlerMap.createTransaction(formData);
      }
      onHide();
    } catch (err) {
      setError(err.message || "Failed to save transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setError(null);
      onHide();
    }
  };

  // Get today's date in YYYY-MM-DD format for max date
  const today = new Date().toISOString().split("T")[0];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? "Upravit transakci" : "Nová transakce"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Protistrana</Form.Label>
            <Form.Control
              type="text"
              name="counterparty"
              value={formData.counterparty}
              onChange={handleChange}
              required
              maxLength={150}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Částka</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Datum</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              max={today}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kategorie</Form.Label>
            <Form.Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Vyberte kategorii</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Poznámka</Form.Label>
            <Form.Control
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              maxLength={250}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Zrušit
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Ukládám..."
              : isEditMode
              ? "Uložit změny"
              : "Vytvořit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TransactionModal;
