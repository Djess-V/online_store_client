import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DeviceList from "../components/shop_components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchTypes, fetchBrands, fetchDevices } from "../http/deviceAPI";
import Pages from "../components/shop_components/Pages";
import { Button } from "react-bootstrap";
import CatalogModal from "../components/modals/CatalogModal";
import { isEmpty } from "../utils/servicesFunction";
import SuccesfulExecution from "../components/modals/SuccesfulExecution";

const catalogModalInit = {
  field: "",
  dataFieldForDirectory: [],
  show: false,
  selected: "",
};

const Shop = observer(() => {
  const { devices } = useContext(Context);

  const [dataCatalogModal, setDataCatalogModal] = useState(catalogModalInit);
  const [addedToCart, setAddedToCart] = useState(false);

  const handlerClick = (condition) => {
    const selected =
      "selected" +
      condition.slice(0, 1).toUpperCase() +
      condition.slice(1, condition.length - 1);

    setDataCatalogModal({
      ...dataCatalogModal,
      field: condition,
      dataFieldForDirectory: devices[condition],
      show: true,
      selected: selected,
    });
  };

  const highlightListItem = (obj, field) => {
    const selected =
      "setSelected" +
      field.slice(0, 1).toUpperCase() +
      field.slice(1, field.length - 1);

    devices[selected](obj);
  };

  useEffect(() => {
    fetchTypes().then((data) => devices.setTypes(data));
    fetchBrands().then((data) => devices.setBrands(data));
    fetchDevices(null, null, 1, 12).then((data) => {
      devices.setDevices(data.rows);
      devices.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(
      devices.selectedType.id,
      devices.selectedBrand.id,
      devices.page,
      devices.limit
    ).then((data) => {
      devices.setDevices(data.rows);
      devices.setTotalCount(data.count);
    });
  }, [devices.page, devices.selectedType, devices.selectedBrand]);

  return (
    <div className="page-shop shop">
      <Container>
        <Row className="shop__row">
          <Button
            className="shop__row_type-or-brand-button"
            variant="outline-success"
            onClick={() => handlerClick("types")}
          >
            {isEmpty(devices.selectedType)
              ? "Выберите тип устройства"
              : devices.selectedType.name}
          </Button>
        </Row>
        <Row className="mt-3">
          <Button
            className="shop__row_type-or-brand-button"
            variant="outline-success"
            onClick={() => handlerClick("brands")}
          >
            {isEmpty(devices.selectedBrand)
              ? "Выберите бренд устройства"
              : devices.selectedBrand.name}
          </Button>
        </Row>
        {!devices.devices.length && (
          <Row>
            <p className="mt-2">
              К сожалению по Вашему запросу ничего не найдено!
            </p>
          </Row>
        )}
        <Row className="shop__device-list-row device-list-row mt-3">
          <DeviceList
            addItemToCart={() => {
              setAddedToCart(true);
              setTimeout(() => setAddedToCart(false), 1000);
            }}
          />
          <Pages />
        </Row>

        <CatalogModal
          show={dataCatalogModal.show}
          onHide={() => setDataCatalogModal({ ...catalogModalInit })}
          data={dataCatalogModal.dataFieldForDirectory}
          field={dataCatalogModal.field}
          selected={devices[dataCatalogModal.selected]}
          highlightListItem={highlightListItem}
        />
        <SuccesfulExecution
          show={addedToCart}
          onHide={() => setAddedToCart(false)}
          message="Товар добавлен в корзину"
        />
      </Container>
    </div>
  );
});

export default Shop;
