<template>
  <gl-bar-chart
    :data="{
      Full: [
        [78, 'Joe'],
        [123, 'Sarah'],
      ],
    }"
    :option="{}"
    y-axis-title="People"
    x-axis-title="Percentage"
    x-axis-type="value"
  />
</template>
