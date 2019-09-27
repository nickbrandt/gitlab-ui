<script>
const data = [
  {
    id: 'folder_1',
    name: 'Folder 1',
    value: 23,
    children: [
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
    ],
  },
  {
    id: 'folder_2',
    name: 'Folder 2',
    value: 46,
    children: [
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
    ],
  },
  {
    id: 'file_1',
    name: 'File 1',
    value: 5,
  },
  {
    id: 'folder_3',
    name: 'Folder 3',
    value: 10,
    children: [
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
    ],
  },
  {
    id: 'folder_4',
    name: 'Folder 4',
    value: 60,
    children: [
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
    ],
  },
  {
    id: 'folder_5',
    name: 'Folder 5',
    value: 13,
    children: [
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
    ],
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
