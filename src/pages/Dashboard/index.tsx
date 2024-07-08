import SearchIcon from '@mui/icons-material/Search';
import { Button, OutlinedInput } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../../components/Card/Card';
import useAmountPerday from '../../hooks/useAmountPerDay';
import useCreditRank from '../../hooks/useCreditRank';
import useGames from '../../hooks/useGames';
import { Amountperday, Credit, SearchParams } from '../../lib/types';
import CreditList from './CreditList';
import GameList from './GameList';

interface lineChartDataType {
  label: string[];
  data: number[];
}

const Dashboard = () => {
  const nav = useNavigate();
  const [params] = useState<SearchParams>({ limit: 10 });
  const state = useGames(params);
  const credit = useCreditRank();
  const lineChart = useAmountPerday();
  const chartData = lineChart.value as Amountperday[];

  const lineChartData: lineChartDataType = {
    label: [],
    data: [],
  };
  chartData?.forEach((data) => {
    lineChartData.label.push(data.date);
    const amount = ethers.formatEther(data.amount);
    lineChartData.data.push(Number(amount));
  });

  const [searchValue, setSearchValue] = useState<string>('');
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
        <div className="flex h-12 w-full">
          <OutlinedInput
            sx={{ flexGrow: 1 }}
            placeholder="Search game address"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchIcon
            onClick={() => nav(`/games/${searchValue}`)}
            sx={{
              height: 48,
              width: 48,
              color: 'primary.main',
              cursor: 'pointer',
            }}
          />
        </div>
      </section>
      <section>
        <LineChart
          xAxis={[{ data: lineChartData.label }]}
          series={[
            {
              data: lineChartData.data,
            },
          ]}
          width={500}
          height={300}
        />
      </section>
      <section className="flex-start flex justify-around gap-2 max-lg:flex-col">
        <div className="w-full">
          <GameCard header={gameHeader()}>
            <GameList games={state.value?.hits} />
          </GameCard>
        </div>
        <div className="w-full">
          <GameCard header={creditHeader()}>
            {<CreditList credits={credit.value as Credit[]} />}
          </GameCard>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
