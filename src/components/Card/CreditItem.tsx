import { ethers } from 'ethers';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import bonus from '../../assets/images/bonus.png';
import { Credit } from '../../lib/types';
import { formatAddress } from '../../lib/utils';

const CreditItem: FC<{ credit: Credit; index: number }> = ({
  credit,
  index,
}) => {
  const nav = useNavigate();
  return (
    <div className="my-2 flex items-center gap-6 p-2">
      <div>
        <img src={bonus} alt="game" width={48} height={48} />
      </div>
      <div>
        <span className="text-green-500">
          {ethers.formatEther(credit.amount)}
        </span>
        ETH
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div>Address</div>
        <div
          className="cursor-pointer text-blue-500"
          onClick={() => nav(`/credits/${credit.address}`)}
        >
          {formatAddress(credit.address)}
        </div>
      </div>
      <div>{index}</div>
    </div>
  );
};

export default CreditItem;
