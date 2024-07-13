import SearchIcon from '@mui/icons-material/Search';
import { Button, OutlinedInput } from '@mui/material';
import type { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../../components/Card/Card';
import DigWrapper from '../../components/DigWrapper';
import useAmountPerday from '../../hooks/useAmountPerDay';
import useCreditRank from '../../hooks/useCreditRank';
import useGames from '../../hooks/useGames';
import useOverview from '../../hooks/useOverview';
import { Amountperday, Credit, Overview, SearchParams } from '../../lib/types';
import CreditList from './CreditList';
import GameList from './GameList';
import OverviewCards from './OverviewCards';

const Dashboard = () => {
  const nav = useNavigate();
  const [params] = useState<SearchParams>({ limit: 10 });
  const state = useGames(params);
  const credit = useCreditRank();
  const lineChart = useAmountPerday();
  const chartData = lineChart.value as Amountperday[];
  const overview = useOverview();

  const options: EChartsOption = {
    title: {
      text: 'Total credits per day',
      left: '3%',
      textStyle: {
        fontFamily: 'dogica',
        fontSize: '12px',
      },
    },
    grid: {
      left: '5%',
      right: '5%',
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: chartData?.map((item) => [
          item.date,
          ethers.formatEther(item.amount),
        ]),
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  const [searchValue, setSearchValue] = useState<string>('');
  const gameHeader = () => (
    <div className="flex items-center justify-between pb-2 font-dogica text-sm font-bold">
      <p className="font-dogica">Latest Games</p>
      <Button onClick={() => nav('/games')} variant="outlined">
        <DigWrapper children={'View All Games'} />
      </Button>
    </div>
  );

  const creditHeader = () => (
    <div className="flex items-center justify-between pb-2 font-dogica text-sm font-bold">
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
          <div className="flex w-12 items-center justify-center rounded-lg bg-accent-light">
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
      <section className="flex rounded-lg bg-background-surface-light p-6">
        <OverviewCards data={(overview.value as Overview) || {}} />
        <div className="relative flex-1">
          <ReactECharts option={options} />
        </div>
      </section>
      <section className="flex-start flex justify-around gap-6 max-lg:flex-col">
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
