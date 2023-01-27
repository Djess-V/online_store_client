import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Button from "react-bootstrap/Button";
import { isEmpty } from "../utils/servicesFunction";

const TypeBar = observer(() => {
  const { devices } = useContext(Context);

  return (
    <div className="type-bar">
      {!isEmpty(devices.types) && (
        <Button
          active={isEmpty(devices.selectedType)}
          className="mb-2 me-2 px-4 type-bar_button"
          onClick={() => devices.setSelectedType({})}
          variant="outline-success"
        >
          Все типы
        </Button>
      )}
      {devices.types.map((type) => (
        <Button
          key={type.id}
          className="mb-2 me-2 px-4 type-bar_button"
          active={type.id === devices.selectedType.id}
          onClick={() => devices.setSelectedType(type)}
          variant="outline-success"
        >
          {type.name}
        </Button>
      ))}
    </div>
  );
});

export default TypeBar;
