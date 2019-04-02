function getRepeatingValue(index) {
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
  let i = index;
  while (i >= values.length) {
    i -= values.length;
  }

  return values[i];
}

export function generateTimeSeries() {
  const timeSeries = [];
  for (let i = 0; i < 100; i += 1) {
    timeSeries.push([new Date(2018, 0, i), getRepeatingValue(i)]);
  }

  return timeSeries;
}

export default {};
