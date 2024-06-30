import { Box, Button, OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GameCard from '../../components/Card/Card';
import useCreditRank from '../../hooks/useCreditRank';
import useGames from '../../hooks/useGames';
import CreditList from './CreditList';
import GameList from './GameList';

const Dashboard = () => {
  const nav = useNavigate();
  // const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
  //   console.log(info?.source, value);
  const state = useGames();
  const credit = useCreditRank();

  const gameHeader = () => (
    <div className="flex items-center justify-between p-2 font-mono text-lg font-bold">
      <p className="">Latest Games</p>
      <Button onClick={() => nav('/games')} variant="outlined">
        View All Games
      </Button>
      {/* <div
        className="cursor-pointer border border-cyan-300 bg-transparent p-2"
        onClick={() => nav('/games')}
      >
        View All Games
      </div> */}
    </div>
  );

  const creditHeader = () => (
    <div className="flex items-center justify-between p-2 font-mono text-lg font-bold">
      <p className="p-2">Latest Credits</p>{' '}
    </div>
  );

  return (
    <div className="mx-auto mt-8 flex w-11/12 flex-col gap-8">
      <section className="flex flex-col items-center justify-center gap-12 sm:gap-20">
        {/* <Search
          className="w-8/12"
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        /> */}
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <OutlinedInput />
        </Box>
      </section>
      <section></section>
      <section className="flex-start flex justify-around gap-2 max-lg:flex-col">
        <div className="w-full">
          <GameCard header={gameHeader()}>
            <GameList games={state.value?.hits} />
            {/* {state.value?.records?.map((item) => (
              <GameItem key={item.id} game={item}></GameItem>
            ))} */}
          </GameCard>
        </div>
        <div className="w-full">
          <GameCard header={creditHeader()}>
            {<CreditList credits={credit.value} />}
            {/* {credit.value?.map((item, index) => (
              <CreditItem
                key={item.address}
                credit={item}
                index={index + 1}
              ></CreditItem>
            ))} */}
          </GameCard>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
