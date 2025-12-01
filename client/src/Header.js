import { useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiRefresh, mdiPlus } from "@mdi/js";
import { useTransactionList } from "./TransactionListProvider";

function Header({ onOpenModal }) {
  const { status, handlerMap } = useTransactionList();
  const [currentState, setCurrentState] = useState(
    new Date().toLocaleTimeString("cs")
  );

  return (
    <>
      <h1>Seznam transakcí</h1>
      <div>
        aktuální čas: {currentState}{" "}
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            handlerMap.fetchTransactions();
            setCurrentState(new Date().toLocaleTimeString("cs"));
          }}
        >
          <Icon path={mdiRefresh} size={1} spin={status === "loading"} />
        </Button>{" "}
        <Button
          variant="primary"
          size="sm"
          onClick={() => onOpenModal()}
        >
          <Icon path={mdiPlus} size={1} /> Nová transakce
        </Button>
      </div>
    </>
  );
}

export default Header;
