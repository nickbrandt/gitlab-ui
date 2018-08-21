import { storiesOf } from "@storybook/vue";

const data = () => ({
  change: () => {},
  pageInfo: {
    page: 3,
    perPage: 10,
    total: 200,
  },
});

storiesOf("pagination", module)
  .add("default", () => ({
    data,
    template: `<gl-pagination :change="change" :page-info="pageInfo" />`
  }))
  .add("small", () => ({
    data,
    template: `<gl-pagination size="sm" :change="change" :page-info="pageInfo" />`
  }))
  .add("large", () => ({
    data,
    template: `<gl-pagination size="lg" :change="change" :page-info="pageInfo" />`
  }));
