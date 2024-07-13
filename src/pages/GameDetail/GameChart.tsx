import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import { FC } from 'react';
import { ClaimData } from '../../lib/types';
import { formatAddress } from '../../lib/utils';

const attackVal = 10;
const defendVal = 5;

// const handleData = (data: ClaimData[]) => {};

const GameChart: FC<{ data: ClaimData[] }> = ({ data }) => {
  const axisData: number[] = [];
  const valData: any[] = [];
  const links: any[] = [];
  data?.forEach((item, i) => {
    axisData.push(item.position);
    const node: any = {
      name: item.position,
      claim: item.claim,
    };
    if (item.position % 2 === 0) {
      node.value = attackVal;
      node.itemStyle = {
        color: 'red',
      };
    } else {
      node.value = defendVal;
      node.itemStyle = {
        color: 'blue',
      };
    }
    valData.push(node);

    const link: any = {
      source: i,
      target: i + 1,
    };
    if (item.position % 2 === 0) {
      link.lineStyle = {
        color: 'red',
      };
    } else {
      link.lineStyle = {
        color: 'blue',
      };
    }

    links.push(link);
  });

  const options: EChartsOption = {
    title: {
      text: 'Dispute Game Graph',
      left: '3%',
      textStyle: {
        fontFamily: 'dogica',
        fontSize: '12px',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          return `${params.data.claim}`;
        }
        return '';
      },
    },
    grid: {
      left: '5%',
      right: '5%',
    },
    xAxis: {
      type: 'category',
      show: false,
      data: axisData,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: valData,
        type: 'graph',
        layout: 'none',
        coordinateSystem: 'cartesian2d',
        symbolSize: 60,
        label: {
          show: true,
          formatter: (params: any) => {
            return `${formatAddress(params.data.claim)}`;
          },
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        links,
        lineStyle: {
          color: 'red',
        },
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={options} />
    </div>
  );
};

export default GameChart;
