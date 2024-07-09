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
  label: Date[];
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
    lineChartData.label.push(new Date(data.date));
    const amount = ethers.formatEther(data.amount);
    lineChartData.data.push(parseFloat(amount));
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
        <div className="flex h-12 w-full md:w-8/12">
          <OutlinedInput
            sx={{ flexGrow: 1, backgroundColor: 'white' }}
            placeholder="Search game address"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="flex w-12 items-center justify-center bg-accent-light">
            <SearchIcon
              onClick={() => nav(`/games/${searchValue}`)}
              sx={{
                height: 24,
                width: 24,
                color: 'white',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      </section>
      <section className="rounded-lg bg-background-surface-light">
        <LineChart
          title="Total credits per day"
          xAxis={[
            {
              id: 'time',
              scaleType: 'time',
              data: lineChartData.label,
              valueFormatter: (date) => date?.toISOString()?.split('T')[0],
            },
          ]}
          series={[
            {
              data: lineChartData.data,
            },
          ]}
          yAxis={[
            {
              id: 'ETH',
              label: 'ETH',
            },
          ]}
          height={300}
        />
      </section>
      <section className="flex-start flex justify-around gap-2 max-lg:flex-col">
        <div className="w-full rounded-lg bg-background-surface-light">
          <GameCard header={gameHeader()}>
            <GameList games={state.value?.hits} />
          </GameCard>
        </div>
        <div className="w-full rounded-lg bg-background-surface-light">
          <GameCard header={creditHeader()}>
            {<CreditList credits={credit.value as Credit[]} />}
          </GameCard>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
