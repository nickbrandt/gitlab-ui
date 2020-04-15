<script>
export default {
  name: 'DefaultExample',
  data() {
    const sortOptions = [
      {
        id: 1,
        label: 'Repository',
        sortProp: 'repository',
      },
      {
        id: 2,
        label: 'Id',
        sortProp: 'id',
      },
      {
        id: 3,
        label: 'Last Updated',
        sortProp: 'lastUpdated',
      },
    ];

    return {
      isAscending: false,
      dropdownText: 'Repository',
      activeOpt: sortOptions[0],
      sortOptions,
    };
  },
  computed: {
    exampleData() {
      const exampleDate = new Date().valueOf();

      return [
        {
          repository: 'GitLab UI',
          id: 'c',
          lastUpdated: new Date(exampleDate - 2000000),
        },
        {
          repository: 'GitLab EE',
          id: 'a',
          lastUpdated: new Date(exampleDate),
        },
        {
          repository: 'GitLab CE',
          id: 'b',
          lastUpdated: new Date(exampleDate - 10000000),
        },
      ];
    },
  },
  methods: {
    onSortItemClick(sortByOpt) {
      this.dropdownText = sortByOpt.label;
      this.activeOpt = sortByOpt;
      this.sortMyData(this.activeOpt, this.isAscending);
    },
    onDirectionChange(isAscending) {
      this.isAscending = isAscending;
      this.sortMyData(this.activeOpt, this.isAscending);
    },
    sortMyData(sortByOpt, isAscending) {
      const { sortProp } = sortByOpt;

      this.exampleData.sort((a, b) => {
        if (a[sortProp] < b[sortProp]) {
          return isAscending ? -1 : 1;
        }
        if (a[sortProp] > b[sortProp]) {
          return isAscending ? 1 : -1;
        }

        return 0;
      });
    },
  },
};
</script>

<template>
  <div>
    <gl-sorting
      :text="dropdownText"
      :is-ascending="isAscending"
      class="mb-3"
      @sortDirectionChange="onDirectionChange"
    >
      <gl-sorting-item
        v-for="opt in sortOptions"
        :key="opt.id"
        :active="opt.id === activeOpt.id"
        @click="onSortItemClick(opt)"
      >
        {{ opt.label }}
      </gl-sorting-item>
    </gl-sorting>

    <div class="example-table">
      <table class="table b-table table-striped table-sm">
        <thead>
          <th>Repository</th>
          <th>Id</th>
          <th>Last Updated</th>
        </thead>
        <tbody>
          <tr v-for="item in exampleData" :key="item.id">
            <td>{{ item.repository }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.lastUpdated }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
