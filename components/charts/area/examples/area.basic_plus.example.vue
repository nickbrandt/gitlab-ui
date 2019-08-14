<template>
  <gl-area-chart
    :data="[{name: 'Values', data: [[0, 5], [4, 3], [8, 10]]}]"
    :option="{
      series: [{
        type: 'scatter',
        data: (() => { var arr = []; for (var i = 0; i < 200; i++) { arr.push([i, i]); } return arr; } )(),
      }]
    }"
  />
</template>
