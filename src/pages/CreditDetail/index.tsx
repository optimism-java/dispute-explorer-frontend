import { Table, TableProps } from 'antd';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import useCreditDetail from '../../hooks/useCreditDetail';
import { CreditDetail } from '../../lib/types';
import { formatAddress } from '../../lib/utils';

const Index = () => {
  const { addr } = useParams();
  const state = useCreditDetail(addr || '');

  const gameColumns: TableProps<CreditDetail>['columns'] = [
    {
      title: 'Index',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Address',
      dataIndex: 'game_contract',
      key: 'game_contract',
      render: (val) => formatAddress(val),
    },
    {
      title: 'Amount',
      dataIndex: 'credit',
      key: 'credit',
      render: (val) => ethers.formatEther(val) + 'ETH',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'created_at',
      key: 'created_at',
    },
  ];

  return (
    <Table
      columns={gameColumns}
      dataSource={state.value?.records}
      loading={state.loading}
      pagination={{ total: state.value?.totalCounts }}
      // onChange={onChange}
    />
  );
};

export default Index;
