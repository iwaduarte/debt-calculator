const isNumber = (n) => !isNaN(parseFloat(n)) && !isNaN(n - 0);
const validateNumbers = (fn) => (value) => {
  return isNumber(value) ? fn(Number(value)) : fn(0);
};

const formatNumbers = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

export { isNumber, validateNumbers, formatNumbers };
