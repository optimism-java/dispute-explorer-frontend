import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import { FC } from 'react';
import { ClaimData } from '../../lib/types';
import { formatAddress } from '../../lib/utils';

const xBase = 50;
const gap = 250;
const attackHeight = 400;
const defendHeight = 300;

const genNodesAndLinks = (data: ClaimData[]): any => {
  const nodes: any[] = [];
  const links: any[] = [];

  data?.forEach((item, i, arr) => {
    const nodeLevel = Math.floor(Math.log2(item.position));
    const node: any = {
      name: item.event_id.toString(),
      claim: item.claim,
      x: xBase + nodeLevel * gap,
    };

    if (item.position % 2 == 0) {
      node.itemStyle = {
        color: 'red',
      };
      node.y = attackHeight;
    } else {
      node.itemStyle = {
        color: 'blue',
      };
      node.y = defendHeight;
    }
    if (arr[i + 1]) {
      const link: any = {
        source: item.event_id.toString(),
        target: arr[i + 1].event_id.toString(),
      };
      if (arr[i + 1].position % 2 === 0) {
        link.lineStyle = {
          color: 'red',
        };
      } else {
        link.lineStyle = {
          color: 'blue',
        };
      }
      links.push(link);
    }

    nodes.push(node);
  });
  return {
    nodes,
    links,
  };
};

const GameChart: FC<{ data: ClaimData[] }> = ({ data }) => {
  const { nodes, links } = genNodesAndLinks(data);

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
    // xAxis: {
    //   type: 'category',
    //   show: false,
    //   data: axisData,
    // },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: nodes,
        type: 'graph',
        layout: 'none',
        // coordinateSystem: 'cartesian2d',
        symbolSize: 100,
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
