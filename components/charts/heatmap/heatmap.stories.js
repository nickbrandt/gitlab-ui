import { withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import { GlHeatmap } from '../../../charts';
import readme from '../area/area.md';

const components = {
  GlHeatmap,
};

function generateData() {
  let data = [[5, 0, 5], [2, 5, 1], [3, 2, 0], [5, 3, 4], [0, 4, 10], [0, 5, 4], [0, 6, 6]];
  data = data.map(item => [item[1], item[0], item[2] || '-']);
  return data;
}

documentedStoriesOf('charts|heatmap', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    data() {
      return {
        data: generateData(),
        xAxisLabels: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        yAxisLabels: ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'],
      };
    },
    components,
    template: `<gl-heatmap
      title="Errors per hour"
      :data-series="data"
      :x-axis-labels="xAxisLabels"
      :y-axis-labels="yAxisLabels"
    />`,
  }))
  .add('with toolbox', () => ({
    data() {
      return {
        data: generateData(),
        xAxisLabels: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        yAxisLabels: ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'],
        option: {
          toolbox: {
            feature: {
              dataZoom: {
                icon: {
                  zoom:
                    'path://M2 7h2v2H2zm7-5v2H7V2zm3.6 9.24l1.08 1.042a1 1 0 1 1-1.39 1.439l-1.079-1.042-.695.719a.5.5 0 0 1-.815-.142L7.493 8.344a.5.5 0 0 1 .645-.668l4.986 2.034a.5.5 0 0 1 .171.81zM2 5V3a1 1 0 0 1 1-1h2v2H4v1zm10-1h-1V2h2a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4zm-7 8a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1v-2h2v1z',
                  back:
                    'path://M5.413 4.949L6.904 6.44a.328.328 0 0 1-.232.56H2.328A.328.328 0 0 1 2 6.672V2.328a.328.328 0 0 1 .56-.232l1.435 1.436a6 6 0 1 1 .455 9.306 1 1 0 1 1 1.184-1.612 4 4 0 1 0-.222-6.277z',
                },
              },
              restore: {
                icon:
                  'path://M2.004 9.136h2.052a3.998 3.998 0 0 0 3.918 2.88c2.208-.039 3.968-1.846 3.93-4.037a3.936 3.936 0 0 0-.995-2.55L9.444 6.936a.33.33 0 0 1-.564-.22l-.075-4.309a.326.326 0 0 1 .322-.33L13.47 2a.33.33 0 0 1 .234.091c.13.125.134.33.008.46L12.302 4a5.912 5.912 0 0 1 1.6 3.945c.059 3.286-2.58 5.997-5.893 6.054-2.975.052-5.482-2.054-6.005-4.863zM14 7.856v.365a5.861 5.861 0 0 0 0-.365zM2.084 9.036h2.044zM4 8.046H2a5.919 5.919 0 0 1 .246-1.686l1.903.618A4.017 4.017 0 0 0 4 8.045zm.612-2.11L2.942 4.84A5.96 5.96 0 0 1 4.405 3.28l1.054 1.7c-.329.269-.616.59-.847.956zm1.247-3.451a6.017 6.017 0 0 1 1.942-.39v1.985a4.013 4.013 0 0 0-1.273.275z',
              },
              saveAsImage: {
                icon:
                  'path://M9 12.165h.793c.133 0 .26.054.353.149a.513.513 0 0 1 0 .718l-1.792 1.82a.495.495 0 0 1-.708 0l-1.792-1.82a.511.511 0 0 1-.147-.36c0-.28.224-.507.5-.507H7v-4.06c0-.56.448-1.015 1-1.015s1 .455 1 1.015v4.06zm2-1.015c-.552 0-1-.454-1-1.015 0-.56.448-1.015 1-1.015 1.105 0 2-.909 2-2.03 0-1.121-.895-2.03-2-2.03a1.99 1.99 0 0 0-.258.017A1.995 1.995 0 0 0 9 4.045a1.97 1.97 0 0 0-1.112.343A2.003 2.003 0 0 0 6 3.03c-1.105 0-2 .909-2 2.03 0 .089.006.176.017.262A2.035 2.035 0 0 0 3 7.09c0 1.121.895 2.03 2 2.03.552 0 1 .455 1 1.015 0 .56-.448 1.015-1 1.015-2.21 0-4-1.818-4-4.06a4.09 4.09 0 0 1 1.064-2.758C2.402 2.437 4.036 1 6 1c1.01 0 1.948.383 2.662 1.03a3.962 3.962 0 0 1 3.055 1.066c1.867.342 3.283 2 3.283 3.994 0 2.242-1.79 4.06-4 4.06z',
              },
            },
          },
        },
      };
    },
    components,
    template: `<gl-heatmap
      title="Errors per hour"
      :data-series="data"
      :x-axis-labels="xAxisLabels"
      :y-axis-labels="yAxisLabels"
      :options="option"
    />`,
  }));
