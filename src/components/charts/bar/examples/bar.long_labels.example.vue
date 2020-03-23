<template>
  <gl-bar-chart
    :data="{
      Office: [
        [100, 'Jim Halpert'],
        [210, 'Dwight Kurt Schrute'],
        [300, 'Pam Beesly'],
        [340, 'Ryan Howard'],
        [130, 'Kelly Rajnigandha Kapoor'],
        [50, 'Scranton Strangler'],
        [90, 'Michael Gary Scott'],
        [-10, 'Andrew Baines Bernard'],
        [50, 'Stanley Hudson'],
        [30, 'Erin Hannon'],
        [50, 'Creed Bratton'],
        [90, 'Oscar'],
        [10, 'Kevin Malone'],
        [50, 'Angela Martin'],
        [30, 'Toby Flenderson'],
      ],
    }"
    y-axis-title="People"
    x-axis-title="Percentage"
    x-axis-type="value"
  />
</template>
