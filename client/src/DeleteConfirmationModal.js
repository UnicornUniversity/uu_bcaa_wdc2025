import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DeleteConfirmationModal({
  show,
  onHide,
  onConfirm,
  transaction,
  isDeleting,
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Potvrdit smazání</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Opravdu chcete smazat transakci s protistranou{" "}
          <strong>{transaction?.counterparty}</strong> ze dne{" "}
          <strong>
            {transaction?.date
              ? new Date(transaction.date).toLocaleDateString("cs")
              : ""}
          </strong>
          ?
        </p>
        <p className="text-muted">Tato akce je nevratná.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isDeleting}>
          Zrušit
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? "Mažu..." : "Smazat"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModal;
