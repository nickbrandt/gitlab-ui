const getRepeatingValue = index => {
  const values = [
    100,
    500,
    400,
    200,
    100,
    800,
    400,
    500,
    600,
    300,
    800,
    900,
    110,
    700,
    400,
    300,
    500,
    300,
    400,
    600,
    700,
  ];
  return index < values.length ? values[index] : values[index % values.length];
};

export const generateTimeSeries = () =>
  new Array(100).fill(0).map((el, i) => [new Date(2018, 0, i), getRepeatingValue(i)]);

export default {};
