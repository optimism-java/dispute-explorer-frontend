import { ethers } from 'ethers';
import type { Overview } from '../../lib/types';

type OverviewProps = {
  data: Overview;
};

const OverviewCards = ({ data }: OverviewProps) => {
  return (
    <div className="flex w-60 flex-col items-center justify-around">
      <div>
        <p className="text-center font-dogica text-xl">
          {ethers
            .formatEther(data?.totalCredit || '0')
            .match(/^\d+(?:\.\d{0,2})?/)}
          <span className="font-dogica text-xl font-bold">ETH</span>
        </p>
        <p className="text-slate-gray text-center leading-7">Total Credits</p>
      </div>
      <div>
        <p className="text-center text-xl font-bold">{data?.totalGames}</p>
        <p className="text-slate-gray text-center leading-7">Total Games</p>
      </div>
    </div>
  );
};

export default OverviewCards;
