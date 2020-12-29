<script>
const ITEMS_BATCH_SIZE = 10;
const INIT_ITEMS_COUNT = 20;

const colors = ['Violet', 'Indigo', 'Blue', 'Green', 'Yellow', 'Orange', 'Red'];
const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

let key = 0;
const createItem = () => {
  key += 1;
  return {
    key,
    content: `${colors[key % colors.length]} ${planets[key % planets.length]}`,
  };
};

const createArray = (num) => {
  const res = [];
  for (let i = 0; i < num; i += 1) {
    res.push(createItem());
  }
  return res;
};

export default {
  data() {
    return {
      isLoading: false,
      fetchedItems: createArray(INIT_ITEMS_COUNT),
      loadTimer: null,
    };
  },
  methods: {
    topReached() {
      clearTimeout(this.loadTimer);
      this.isLoading = true;
      this.loadTimer = setTimeout(() => {
        this.fetchedItems.unshift(...createArray(ITEMS_BATCH_SIZE));
        this.isLoading = false;
      }, 1000);
    },
    bottomReached() {
      clearTimeout(this.loadTimer);
      this.isLoading = true;
      this.loadTimer = setTimeout(() => {
        this.fetchedItems.push(...createArray(ITEMS_BATCH_SIZE));
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>
<template>
  <gl-infinite-scroll
    :max-list-height="285"
    :fetched-items="fetchedItems.length"
    @topReached="topReached"
    @bottomReached="bottomReached"
  >
    <template #items>
      <ul class="list-group list-group-flushed list-unstyled">
        <li v-for="item in fetchedItems" :key="item.key" class="list-group-item">
          {{ item.content }}
        </li>
      </ul>
    </template>

    <template #default>
      <div class="gl-mt-3">
        <gl-loading-icon v-if="isLoading" />
        <span v-else>{{ fetchedItems.length }} items loaded, scroll up or down for more</span>
      </div>
    </template>
  </gl-infinite-scroll>
</template>
