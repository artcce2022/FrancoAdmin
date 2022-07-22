export const FormatCurrency = data => {
  return (
    '$' +
    (isNumber(data)
      ? parseFloat(data)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
      : data)
  );
};

var isNumber = function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
};
