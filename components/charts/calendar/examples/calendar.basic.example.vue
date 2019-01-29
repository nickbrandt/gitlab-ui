<template>
  <gl-calendar-chart
    :data="[['2018-12-1', 5],['2018-1-1', 20],['2018-2-1', 40]]"
    :option="{ calendar: { range: ['2018-01-28', '2019-01-28'] }}"
  />
</template>
