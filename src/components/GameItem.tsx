import { FC } from 'react';
import { Game } from '../lib/types';
import { calculateDate, formatAddress } from '../lib/utils';

const GameItem: FC<{ game: Game }> = ({ game }) => {
  return (
    <div>
      <div>Index: {game.id}</div>
      <div>Block: {game.l_2_block_number}</div>
      <div>Address: {formatAddress(game.game_contract)}</div>
      <p>{calculateDate(game.created_at)}</p>
    </div>
  );
};

export default GameItem;
