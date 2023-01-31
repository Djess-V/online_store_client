import React, { useCallback, useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import Image from "react-bootstrap/Image";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const DeviceItem = observer(({ device, brand }) => {
  const { devices } = useContext(Context);
  const history = useNavigate();

  const selectDevice = useCallback(() => {
    devices.setSelectedDevice(device.id);
    history(DEVICE_ROUTE + "/" + device.id);
  }, [devices, history]);

  return (
    <div className="device-list__device-item device-item">
      <Card
        className="device-item__card mt-3 mx-2 p-2 d-flex flex-column"
        style={{
          cursor: "pointer",
          height: "100%",
        }}
        onClick={() => selectDevice()}
      >
        <Image
          width={150}
          height={150}
          className="mx-auto"
          src={process.env.REACT_APP_API_URL + "/" + device.img}
          alt="Device Image"
        />
        <div className="my-1 d-flex justify-content-between align-items-center">
          <div className="text-black-50">{brand}</div>
          <div className="d-flex align-items-center">
            <div className="me-1 text-black-50">{device.rating}</div>
            <Image width={20} height={20} src={star} alt="Star" />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </div>
  );
});

export default DeviceItem;
