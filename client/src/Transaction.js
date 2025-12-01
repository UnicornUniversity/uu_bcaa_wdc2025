import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Icon from "@mdi/react";
import { mdiPencil, mdiDelete } from "@mdi/js";

function Transaction({ transaction, categoryMap, onEdit, onDelete }) {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {transaction.counterparty}{" "}
            {new Date(transaction.date).toLocaleDateString("cs")}{" "}
            {transaction.amount.toLocaleString("cs")}{" "}
            {categoryMap[transaction.categoryId]?.name}
          </div>
          {(onEdit || onDelete) && (
            <ButtonGroup size="sm">
              {onEdit && (
                <Button variant="outline-secondary" onClick={onEdit}>
                  <Icon path={mdiPencil} size={0.8} />
                </Button>
              )}
              {onDelete && (
                <Button variant="outline-danger" onClick={onDelete}>
                  <Icon path={mdiDelete} size={0.8} />
                </Button>
              )}
            </ButtonGroup>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Transaction;
