import echarts from 'echarts';
import { withKnobs, object } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import { GlHeatmap } from '../../charts';
import readme from '../../components/charts/area/area.md';

const components = {
  GlHeatmap,
};

function getVirtulData(year) {
  year = year || '2017';
  var date = +echarts.number.parseDate(year + '-01-01');
  var end = +echarts.number.parseDate(+year + 1 + '-01-01');
  var dayTime = 3600 * 24 * 1000;
  var data = [];
  for (var time = date; time < end; time += dayTime) {
    data.push([echarts.format.formatTime('yyyy-MM-dd', time), Math.floor(Math.random() * 10000)]);
  }
  return data;
};

const generateProps = () => ({
  title: {
    top: 30,
    left: 'center',
    text: '2016',
  },
  tooltip: {
    transitionDuration: 0,
  },
  visualMap: {
    min: 0,
    max: 10000,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    top: 65,
  },
  calendar: {
    top: 120,
    left: 30,
    right: 30,
    cellSize: ['auto', 13],
    range: '2016',
    yearLabel: { show: false },
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: getVirtulData(2016),
  },
});

documentedStoriesOf('charts|heatmap', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    computed: {
      dataSeries() {
        var year = '2017';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate(+year + 1 + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
          data.push([echarts.format.formatTime('yyyy-MM-dd', time), Math.floor(Math.random() * 10000)]);
        }
        return data;
      }
    },
    components,
    template: `<gl-heatmap
      title="heatmap default"
      :series-data="dataSeries"
    />`,
  }));
