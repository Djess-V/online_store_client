import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import Button from "react-bootstrap/Button";
import { isEmpty } from "../utils/servicesFunction";

const BrandBar = observer(() => {
  const { devices } = useContext(Context);

  return (
    <div className="brand-bar">
      {!isEmpty(devices.brands) && (
        <Button
          active={isEmpty(devices.selectedBrand)}
          className="mb-2 me-2 px-4 brand-bar_button"
          variant="outline-success"
          onClick={() => devices.setSelectedBrand({})}
        >
          Все бренды
        </Button>
      )}
      {devices.brands.map((brand) => (
        <Button
          active={brand.id === devices.selectedBrand.id}
          key={brand.id}
          className="mb-2 me-2 px-4 brand-bar_button"
          variant="outline-success"
          onClick={() => devices.setSelectedBrand(brand)}
        >
          {brand.name}
        </Button>
      ))}
    </div>
  );
});

export default BrandBar;
