import { Table } from 'antd';
import { SearchProps } from 'antd/es/input';
import Search from 'antd/es/input/Search';
import useCreditRank from '../../hooks/useCreditRank';
import useGames from '../../hooks/useGames';
import { Game } from '../../lib/types';
import { creditRankColumns, gameColumns } from './columns';

const Dashboard = () => {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);
  const state = useGames();
  const credit = useCreditRank();
  // TODO
  const gameDetail = (record: Game) => {
    console.log(record);
  };

  return (
    <div className="mx-auto mt-8 flex w-11/12 flex-col gap-8">
      <section className="flex flex-col items-center justify-center gap-12 sm:gap-20">
        <Search
          className="w-8/12"
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
      </section>
      <section></section>
      <section className="flex items-center justify-center max-md:flex-col">
        {
          <Table
            columns={gameColumns}
            dataSource={state.value}
            pagination={false}
            loading={state.loading}
            onRow={(record) => ({
              onClick: () => gameDetail(record),
            })}
          />
        }
        {
          <Table
            columns={creditRankColumns}
            dataSource={credit.value}
            pagination={false}
            loading={state.loading}
          />
        }
      </section>
    </div>
  );
};

export default Dashboard;
