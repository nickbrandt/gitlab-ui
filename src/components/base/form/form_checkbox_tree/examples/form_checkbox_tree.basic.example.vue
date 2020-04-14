<template>
  <gl-form-checkbox-tree
    :value="[1, 11, 12, 121, 122, 2113, 3]"
    :options="[
      {
        value: 1,
        label: 'Felidae',
        children: [
          {
            value: 11,
            label: 'Lion',
          },
          {
            value: 12,
            label: 'Felinae',
            children: [
              {
                value: 121,
                label: 'Cheetah',
              },
              {
                value: 122,
                label: 'Ocelot',
              },
            ],
          },
        ],
      },
      {
        value: 2,
        label: 'Canidae',
        children: [
          {
            value: 21,
            label: 'Caninae',
            children: [
              {
                value: 211,
                label: 'Canis lupus',
                children: [
                  {
                    value: 2112,
                    label: 'Wolf',
                  },
                  {
                    value: 2113,
                    label: 'Himalayan wolf',
                  },
                  {
                    value: 2114,
                    label: 'Dingo',
                  },
                ],
              },
              {
                value: 212,
                label: 'Black-backed jackal',
              },
            ],
          },
          {
            value: 22,
            label: 'Fennec fox',
          },
        ],
      },
      {
        value: 3,
        label: 'Karabair',
      },
      {
        value: 4,
        label: 'Okapi',
      },
    ]"
  />
</template>
