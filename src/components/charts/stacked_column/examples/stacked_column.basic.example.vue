<template>
  <gl-stacked-column-chart
    :bars="[
      {
        name: 'Fun 1',
        data: [58, 49, 38, 23, 27, 68, 38, 35, 7, 64, 65, 31],
      },
      {
        name: 'Fun 2',
        data: [8, 6, 34, 19, 9, 7, 17, 25, 14, 7, 10, 32],
      },
    ]"
    :group-by="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
    x-axis-type="category"
    x-axis-title="January - December 2018"
    y-axis-title="Commits"
  />
</template>
