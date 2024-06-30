import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import gameImg from '../../assets/images/game.png';
import loading from '../../assets/images/loading.png';
import shield from '../../assets/images/shield.png';
import sword from '../../assets/images/sword.png';
import { Game } from '../../lib/types';
import { calculateDate, formatAddress } from '../../lib/utils';

const GameItem: FC<{ game: Game }> = ({ game }) => {
  const nav = useNavigate();

  const goToDetail = (addr: string) => {
    nav(`/games/${addr}`);
  };
  return (
    <div className="my-2 flex items-center gap-6 p-2">
      <div>
        <img src={gameImg} alt="game" width={48} height={48} />
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="cursor-pointer text-blue-400"
          onClick={() =>
            window.open(
              `https://goerli-optimism.etherscan.io/block/${game.l2_block_number}`
            )
          }
        >
          {game.l2_block_number}
        </div>
        <div className="text-xs italic">
          {calculateDate(new Date(game.block_time * 1000))}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div>Game Address</div>
        <div
          className="cursor-pointer text-blue-500"
          onClick={() => goToDetail(game.game_contract)}
        >
          {formatAddress(game.game_contract)}
        </div>
      </div>
      <div>
        {game.status === 0 && (
          <img src={loading} alt="loading" width={24} height={24} />
        )}
        {game.status === 1 && (
          <img src={sword} alt="sword" width={24} height={24} />
        )}
        {game.status === 1 && (
          <img src={shield} alt="shield" width={24} height={24} />
        )}
      </div>
    </div>
  );
};

export default GameItem;
