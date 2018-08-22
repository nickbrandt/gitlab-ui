import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from '@storybook/addon-knobs';
import { sizeOptions } from '../utils/constants';

function generateProps({
  page = 3,
  perPage = 10,
  totalItems = 200,
} = {}) {
  return {
    change: {
      type: Function,
      default: (current, past) => console.log(
        `switched from ${past} to ${current}`,
      ),
    },
    page: {
      type: Number,
      default: number('current page', page),
    },
    perPage: {
      type: Number,
      default: number('per page', perPage),
    },
    totalItems: {
      type: Number,
      default: number('total items', totalItems),
    },
  };
};

function generateTemplate(size) {
  return `<gl-pagination
    size="${size}"
    :change="change"
    :page="page"
    :per-page="perPage"
    :total-items="totalItems"
  />`
}

const stories = storiesOf("pagination", module)
  .addDecorator(withKnobs)

Object.entries(sizeOptions)
  .forEach(([name, size]) => stories
    .add(name, () => ({
      props: generateProps(),
      template: generateTemplate(size)
    }))
  );
