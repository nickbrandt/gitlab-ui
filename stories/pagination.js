import { storiesOf } from "@storybook/vue";

const data = () => {
  return {
    currentPage: 3
  };
};

storiesOf("pagination", module)
  .add("default", () => ({
    data,
    template: `<gl-pagination :link-gen="pageNum => '#'" :number-of-pages="20" :value="currentPage" />`
  }))
  .add("small", () => ({
    data,
    template: `<gl-pagination size="sm" :link-gen="pageNum => '#'" :number-of-pages="20" :value="currentPage" />`
  }))
  .add("large", () => ({
    data,
    template: `<gl-pagination size="lg" :link-gen="pageNum => '#'" :number-of-pages="20" :value="currentPage" />`
  }));
