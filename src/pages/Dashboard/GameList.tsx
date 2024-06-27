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
            primary={game.l_2_block_number}
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
            <CircularProgress color="primary" disableShrink />
          </ListItemAvatar>
        </ListItem>
      ))}
    </List>
  );
};

export default GameList;
