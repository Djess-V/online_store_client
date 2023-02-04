import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Row from "react-bootstrap/esm/Row";
import { Context } from "../..";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(({ addItemToCart = (f) => f }) => {
  const { devices } = useContext(Context);

  const getBrand = (id) => {
    if (devices.brands.length === 0) {
      return "";
    }
    return devices.brands.filter((brand) => brand.id === id)[0].name;
  };

  return (
    <Row className="device-list-row__device-list device-list d-flex">
      {devices.devices.map((device) => (
        <DeviceItem
          key={device.id}
          device={device}
          addItemToCart={addItemToCart}
          brand={getBrand(device.brandId)}
        />
      ))}
    </Row>
  );
});

export default DeviceList;
