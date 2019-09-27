<script>
const data = [
  {
    id: 'file_1',
    name: 'File 1',
    value: 13,
  },
  {
    id: 'file_2',
    name: 'File 2',
    value: 10,
  },

  {
    id: 'file_1',
    name: 'File 1',
    value: 12,
  },
  {
    id: 'file_2',
    name: 'File 2',
    value: 34,
  },

  {
    id: 'file_1',
    name: 'File 1',
    value: 4,
  },
  {
    id: 'file_2',
    name: 'File 2',
    value: 6,
  },

  {
    id: 'folder_1',
    name: 'Folder 1',
    value: 5,
  },
  {
    id: 'file_1',
    name: 'File 1',
    value: 45,
  },
  {
    id: 'file_2',
    name: 'File 2',
    value: 10,
  },

  {
    id: 'file_1',
    name: 'File 1',
    value: 2,
  },
  {
    id: 'file_2',
    name: 'File 2',
    value: 1,
  },
  {
    id: 'file_4',
    name: 'File 4',
    value: 13,
  },
  {
    id: 'file_5',
    name: 'File 5',
    value: 2,
  },
  {
    id: 'file_6',
    name: 'File 6',
    value: 1,
  },
  {
    id: 'file_7',
    name: 'File 7',
    value: 27,
  },
  {
    id: 'file_8',
    name: 'File 8',
    value: 12,
  },
  {
    id: 'file_9',
    name: 'File 9',
    value: 23,
  },
  {
    id: 'file_10',
    name: 'File 10',
    value: 30,
  },
  {
    id: 'file_11',
    name: 'File 11',
    value: 44,
  },
  {
    id: 'file_12',
    name: 'File 12',
    value: 32,
  },
  {
    id: 'file_13',
    name: 'File 13',
    value: 8,
  },
  {
    id: 'file_14',
    name: 'File 14',
    value: 40,
  },
  {
    id: 'file_15',
    name: 'File 15',
    value: 30,
  },
  {
    id: 'file_16',
    name: 'File 16',
    value: 14,
  },
];

export default {
  data() {
    return {
      chartData: data,
    };
  },
};
</script>
<template>
  <gl-treemap :data="chartData" />
</template>
