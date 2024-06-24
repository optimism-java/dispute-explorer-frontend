import { TableProps } from 'antd';
import { GameStatus } from '../../lib/constants';
import { Credit, Game } from '../../lib/types';
import { calculateDate, formatAddress } from '../../lib/utils';

export const gameColumns: TableProps<Game>['columns'] = [
  {
    title: 'Index',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Game type',
    dataIndex: 'game_type',
    key: 'game_type',
  },
  {
    title: 'Address',
    dataIndex: 'game_contract',
    key: 'game_contract',
    render: (val) => formatAddress(val),
  },
  {
    title: 'L2 block',
    dataIndex: 'l_2_block_number',
    key: 'l_2_block_number',
  },
  {
    title: 'Age',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (val) => calculateDate(val),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (val) => GameStatus[val],
  },
];

export const creditRankColumns: TableProps<Credit>['columns'] = [
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (val) => formatAddress(val),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
];
