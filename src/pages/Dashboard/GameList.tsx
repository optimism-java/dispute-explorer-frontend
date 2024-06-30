import {
  Avatar,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { List } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import gameImg from '../../assets/images/game.png';
import shield from '../../assets/images/shield.png';
import sword from '../../assets/images/sword.png';
import { Game } from '../../lib/types';
import { formatAddress } from '../../lib/utils';

interface GameListProps {
  games?: Game[];
}

const GameList: FC<GameListProps> = ({ games }) => {
  const nav = useNavigate();
  return (
    <List>
      {games?.map((game) => (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="game" src={gameImg} />
          </ListItemAvatar>
          <ListItemText
            primary={game.l2_block_number}
            secondary={
              <React.Fragment>
                <Typography>a few minutes ago</Typography>
              </React.Fragment>
            }
          ></ListItemText>
          <ListItemText
            primary="Game Address"
            secondary={
              <React.Fragment>
                <Typography onClick={() => nav(`/games/${game.game_contract}`)}>
                  {formatAddress(game.game_contract)}
                </Typography>
              </React.Fragment>
            }
          ></ListItemText>
          <ListItemAvatar>
            {game.status === 0 && (
              <CircularProgress color="primary" disableShrink />
            )}
            {game.status === 1 && (
              <img src={shield} width={48} height={48} alt="shield" />
            )}
            {game.status === 2 && (
              <img src={sword} width={48} height={48} alt="sword" />
            )}
          </ListItemAvatar>
        </ListItem>
      ))}
    </List>
  );
};

export default GameList;
