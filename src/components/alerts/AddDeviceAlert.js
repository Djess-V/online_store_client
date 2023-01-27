import React from "react";
import Alert from "react-bootstrap/Alert";

const AddDeviceAlert = ({ show }) => {
  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>Товар добавлен в корзину!</Alert.Heading>
      </Alert>
    </>
  );
};

export default AddDeviceAlert;
