import { Table } from 'antd';
import { SearchProps } from 'antd/es/input';
import Search from 'antd/es/input/Search';
import { useNavigate } from 'react-router-dom';
import GameCard from '../../components/GameCard/GameCard';
import GameItem from '../../components/GameCard/GameItem';
import useCreditRank from '../../hooks/useCreditRank';
import useGames from '../../hooks/useGames';
import { creditRankColumns } from './columns';

const Dashboard = () => {
  const nav = useNavigate();
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);
  const state = useGames();
  const credit = useCreditRank();

  const gameHeader = () => (
    <div className="flex items-center justify-between p-2 font-mono text-lg font-bold">
      <p className="">Latest Games</p>{' '}
      <div
        className="cursor-pointer border border-cyan-300 bg-transparent p-2"
        onClick={() => nav('/games')}
      >
        View All Games
      </div>
    </div>
  );

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
      <section className="flex items-center justify-center gap-2 max-lg:flex-col">
        <div className="w-full">
          <GameCard header={gameHeader()}>
            {state.value?.map((item) => (
              <GameItem key={item.id} game={item}></GameItem>
            ))}
          </GameCard>
        </div>
        <div className="w-full">1111</div>
      </section>
      <section className="flex flex-col gap-2">
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
