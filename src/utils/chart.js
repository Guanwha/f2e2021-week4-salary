import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import store from '@/store';

Chart.register(zoomPlugin);
const colors = ['#FCA5A5', '#FCD34D', '#6EE7B7', '#93C5FD', '#C4B5FD', '#F9A8D4', '#D1D5DB'];
const borderColors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#6B7280'];

const chartJobTenureVSSalary = (dom, datasets) => {
  // initialize chart datasets & give a style
  const chartData = {
    datasets: [],
  };
  const datasetsKeys = Object.keys(datasets);
  datasetsKeys.forEach((key, idx) => {
    chartData.datasets.push({
      label: key,
      backgroundColor: colors[idx % (colors.length)],
      borderColor: borderColors[idx % (colors.length)],
      data: datasets[key],
      // cubicInterpolationMode: 'monotone',
      // tension: 0.4,
    });
  });

  // generate bubble chart
  let selectedInfo = [];    // for click event to remember clicked object
  const chart = new Chart(
    dom,
    {
      type: 'bubble',
      data: chartData,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            suggestedMin: 0.5,
            ticks: {
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              callback(val) { return `${this.getLabelForValue(val)} 年`; },
            },
            title: {
              display: true,
              text: '年資',
            },
          },
          y: {
            suggestedMin: 20,
            ticks: {
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              callback(val) { return `${this.getLabelForValue(val)} 萬`; },
            },
            title: {
              display: true,
              text: '年薪',
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: '年資 vs 年薪',
            aling: 'center',
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              drag: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
        onClick(e) {
          const activePoints = chart.getElementsAtEventForMode(e, 'nearest', {
            intersect: true,
          }, false);
          selectedInfo = [];
          activePoints.forEach((activePoint) => {
            const idxDataset = activePoint.datasetIndex;
            const idxData = activePoint.index;
            selectedInfo[datasetsKeys[idxDataset]] = {};
            selectedInfo[datasetsKeys[idxDataset]].options = { color: colors[idxDataset], borderColor: borderColors[idxDataset] };
            selectedInfo[datasetsKeys[idxDataset]].data = datasets[datasetsKeys[idxDataset]][idxData].d;
          });
          store.dispatch('salary/setSelectedInfo', selectedInfo);
        },
      },
    },
  );
  return chart;
};

const updateDatasets = (newDatasets) => {
  // initialize chart datasets & give a style
  const chartData = {
    datasets: [],
  };
  const datasetsKeys = Object.keys(newDatasets);
  datasetsKeys.forEach((key, idx) => {
    chartData.datasets.push({
      label: key,
      backgroundColor: colors[idx % (colors.length)],
      borderColor: borderColors[idx % (colors.length)],
      data: newDatasets[key],
      // cubicInterpolationMode: 'monotone',
      // tension: 0.4,
    });
  });

  return chartData.datasets;
};

export {
  chartJobTenureVSSalary, updateDatasets,
};
