import { storiesOf } from "@storybook/vue";

const data = () => ({
  change: () => {},
  page: 3,
  perPage: 10,
  totalRows: 200,
});

storiesOf("pagination", module)
  .add("default", () => ({
    data,
    template: `<gl-pagination
      :change="change"
      :page="page"
      :per-page="perPage"
      :total-rows="totalRows"
      />`,
  }))
  .add("small", () => ({
    data,
    template: `<gl-pagination
      size="sm"
      :change="change"
      :page="page"
      :per-page="perPage"
      :total-rows="totalRows"
      />`,
  }))
  .add("large", () => ({
    data,
    template: `<gl-pagination
      size="lg"
      :change="change"
      :page="page"
      :per-page="perPage"
      :total-rows="totalRows"
      />`,
  }));
