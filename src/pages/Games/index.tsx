import { Table, TableProps } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useGames from '../../hooks/useGames';
import { GameStatus } from '../../lib/constants';
import { Game } from '../../lib/types';
import { calculateDate, formatAddress } from '../../lib/utils';

const Index: FC = () => {
  const nav = useNavigate();
  const gameColumns: TableProps<Game>['columns'] = [
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

  const state = useGames();
  return (
    <Table
      columns={gameColumns}
      dataSource={state.value?.records}
      pagination={{ total: state.value?.totalCounts }}
      loading={state.loading}
      onRow={(item) => ({
        onClick: () => {
          nav(`/games/${item.game_contract}`);
        },
      })}
    />
  );
};

export default Index;
