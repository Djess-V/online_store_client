// Проверка объекта на пустоту.

export const isEmpty = (obj) => {
  if (obj instanceof Array) {
    for (let elem of obj) {
      return false;
    }
    return true;
  } else {
    for (let key in obj) {
      return false;
    }
    return true;
  }
};

// Рассчитать данные для поля ИТОГО в OrderItem.

export const calculateDataForFieldTotalPageOrderItem = (records) => {
  let totalCount = 0;
  let totalSum = 0;

  for (let record of records) {
    totalCount += record.count;
    totalSum += record.sum;
  }

  return { totalCount, totalSum };
};
