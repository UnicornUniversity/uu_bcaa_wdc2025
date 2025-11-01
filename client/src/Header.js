import { useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiRefresh } from "@mdi/js";

function Header() {
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
            setCurrentState(new Date().toLocaleTimeString("cs"));
          }}
        >
          <Icon path={mdiRefresh} size={1} />
        </Button>
      </div>
    </>
  );
}

export default Header;
