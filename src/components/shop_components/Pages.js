import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
  const { devices } = useContext(Context);
  const pageCount = Math.ceil(devices.totalCount / devices.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="shop__pagination-shop-row pagination-shop">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={devices.page === page}
          onClick={() => devices.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
