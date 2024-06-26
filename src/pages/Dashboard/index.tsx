import { SearchProps } from 'antd/es/input';
import Search from 'antd/es/input/Search';
import { useNavigate } from 'react-router-dom';
import GameCard from '../../components/Card/Card';
import CreditItem from '../../components/Card/CreditItem';
import GameItem from '../../components/Card/GameItem';
import useCreditRank from '../../hooks/useCreditRank';
import useGames from '../../hooks/useGames';

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

  const creditHeader = () => (
    <div className="flex items-center justify-between p-2 font-mono text-lg font-bold">
      <p className="">Latest Credits</p>{' '}
      <div
        className="cursor-pointer border border-cyan-300 bg-transparent p-2"
        onClick={() => nav('/credits')}
      >
        View All Credits
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
      <section className="flex-start flex justify-around gap-2 max-lg:flex-col">
        <div className="w-full">
          <GameCard header={gameHeader()}>
            {state.value?.map((item) => (
              <GameItem key={item.id} game={item}></GameItem>
            ))}
          </GameCard>
        </div>
        <div className="w-full">
          <GameCard header={creditHeader()}>
            {credit.value?.map((item, index) => (
              <CreditItem
                key={item.address}
                credit={item}
                index={index + 1}
              ></CreditItem>
            ))}
          </GameCard>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
