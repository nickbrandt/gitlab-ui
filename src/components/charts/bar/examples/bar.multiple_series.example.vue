<template>
  <gl-bar-chart
    :data="{
      Office: [
        [78, 'Andrew Baines Bernard'],
        [123, 'Angela Martin'],
      ],
      ModernFamily: [
        [39, 'Phil Dunphy'],
        [4, 'Luke Dunphy'],
      ],
      Friends: [
        [239, 'Chandler Muriel Bing'],
        [92, 'Joseph Francis Tribbiani'],
      ],
    }"
    :option="{}"
    y-axis-title="People"
    x-axis-title="Percentage"
    x-axis-type="value"
  />
</template>
