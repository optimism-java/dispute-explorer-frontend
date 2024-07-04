import {
  Avatar,
  CircularProgress,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { List } from 'antd';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gameImg from '../../assets/images/game.png';
import shield from '../../assets/images/shield.png';
import sword from '../../assets/images/sword.png';
import { Game } from '../../lib/types';
import { calculateDate, formatAddress } from '../../lib/utils';

interface GameListProps {
  games?: Game[];
}

const GameList: FC<GameListProps> = ({ games }) => {
  const nav = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        message="Copied"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setOpen(false)}
      />
      <List>
        {games?.map((game) => (
          <ListItem alignItems="flex-start" key={game.id}>
            <ListItemAvatar>
              <Avatar alt="game" src={gameImg} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Link underline="hover">
                    <a
                      target="_blank"
                      href={`https://sepolia-optimism.etherscan.io/block/${game.l2_block_number}`}
                    >
                      {game.l2_block_number}
                    </a>
                  </Link>
                </>
              }
              secondary={
                <React.Fragment>
                  <Typography component={'span'}>
                    {calculateDate(new Date(game.block_time * 1000))}
                  </Typography>
                </React.Fragment>
              }
            ></ListItemText>
            <ListItemText
              primary="Game Address"
              secondary={
                <React.Fragment>
                  <Stack direction={'row'} gap={2}>
                    <Tooltip title={game.game_contract} placement="top">
                      <Link
                        href={`/games/${game.game_contract}`}
                        underline="hover"
                      >
                        {formatAddress(game.game_contract)}
                      </Link>
                    </Tooltip>
                    {/* <CopyToClipboard
                      text={game.game_contract}
                      onCopy={(text, res) => setOpen(res)}
                    >
                      <ContentCopyIcon sx={{ color: 'black' }} />
                    </CopyToClipboard> */}
                  </Stack>
                </React.Fragment>
              }
            ></ListItemText>
            <ListItemAvatar>
              {game.status === 0 && (
                <CircularProgress color="primary" disableShrink />
              )}
              {game.status === 1 && (
                <img src={sword} width={48} height={48} alt="sword" />
              )}
              {game.status === 2 && (
                <img src={shield} width={48} height={48} alt="shield" />
              )}
            </ListItemAvatar>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GameList;
