import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap?Button";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import DeleteUserModal from "../components/modals/DeleteUserModal";
import DeleteTypeModal from "../components/modals/DeleteTypeModal";
import DeleteBrandModal from "../components/modals/DeleteBrandModal";
import DeleteDeviceModal from "../components/modals/DeleteDeviceModal";
import SuccesfulExecution from "../components/modals/SuccesfulExecution";
import FailExecution from "../components/modals/FailExecution";

const initialModalPanel = {
  showTypeModal: false,
  showBrandModal: false,
  showDeviceModal: false,
  showDeleteUserModal: false,
  showDeleteTypeModal: false,
  showDeleteBrandModal: false,
  showDeleteDeviceModal: false,
  showSuccesfulExecution: false,
  showFailExecution: false,
};

const Admin = () => {
  const [modalPanel, setModalPanel] = useState(initialModalPanel);

  const handlerClick = (type) => {
    setModalPanel({ ...modalPanel, [type]: !modalPanel[type] });
  };

  const showModalWindowExecution = (condition) => {
    if (condition) {
      setModalPanel({ ...modalPanel, showSuccesfulExecution: true });
    } else {
      setModalPanel({ ...modalPanel, showFailExecution: true });
    }
  };

  return (
    <div className="admin_block">
      <Container className="d-flex flex-column">
        <Button
          variant="outline-success"
          className="p-2"
          onClick={() => handlerClick("showTypeModal")}
        >
          Добавить новый тип
        </Button>
        <Button
          variant="outline-success"
          className="mt-2 p-2"
          onClick={() => handlerClick("showBrandModal")}
        >
          Добавить новый брэнд
        </Button>
        <Button
          variant="outline-success"
          className="mt-2 mb-5 p-2"
          onClick={() => handlerClick("showDeviceModal")}
        >
          Добавить новое устройство
        </Button>
        <Button
          variant="outline-success"
          className="mt-2 p-2"
          onClick={() => handlerClick("showDeleteUserModal")}
        >
          Удалить пользователя
        </Button>
        <Button
          variant="outline-success"
          className="mt-2 p-2"
          onClick={() => handlerClick("showDeleteTypeModal")}
        >
          Удалить тип
        </Button>
        <Button
          variant="outline-success"
          className="mt-2 p-2"
          onClick={() => handlerClick("showDeleteBrandModal")}
        >
          Удалить брэнд
        </Button>
        <Button
          variant="outline-success"
          className="mt-2 p-2"
          onClick={() => handlerClick("showDeleteDeviceModal")}
        >
          Удалить устройство
        </Button>
        <CreateType
          show={modalPanel.showTypeModal}
          onHide={() => handlerClick("showTypeModal")}
        />
        <CreateBrand
          show={modalPanel.showBrandModal}
          onHide={() => handlerClick("showBrandModal")}
        />
        <CreateDevice
          show={modalPanel.showDeviceModal}
          onHide={() => handlerClick("showDeviceModal")}
        />
        <DeleteUserModal
          show={modalPanel.showDeleteUserModal}
          onHide={() => handlerClick("showDeleteUserModal")}
          showModalWindowExecution={showModalWindowExecution}
        />
        <DeleteTypeModal
          show={modalPanel.showDeleteTypeModal}
          onHide={() => handlerClick("showDeleteTypeModal")}
          showModalWindowExecution={showModalWindowExecution}
        />
        <DeleteBrandModal
          show={modalPanel.showDeleteBrandModal}
          onHide={() => handlerClick("showDeleteBrandModal")}
          showModalWindowExecution={showModalWindowExecution}
        />
        <DeleteDeviceModal
          show={modalPanel.showDeleteDeviceModal}
          onHide={() => handlerClick("showDeleteDeviceModal")}
          showModalWindowExecution={showModalWindowExecution}
        />
        <SuccesfulExecution
          show={modalPanel.showSuccesfulExecution}
          onHide={() => handlerClick("showSuccesfulExecution")}
        />
        <FailExecution
          show={modalPanel.showFailExecution}
          onHide={() => handlerClick("showFailExecution")}
        />
      </Container>
    </div>
  );
};

export default Admin;
