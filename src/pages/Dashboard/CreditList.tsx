import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { ethers } from 'ethers';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import bonus from '../../assets/images/bonus.png';
import { Credit } from '../../lib/types';
import { formatAddress } from '../../lib/utils';

interface CreditListProps {
  credits?: Credit[];
}
const CreditList: FC<CreditListProps> = ({ credits }) => {
  const nav = useNavigate();
  return (
    <List>
      {credits?.map((item, index) => (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="game" src={bonus} />
          </ListItemAvatar>
          <ListItemText
            primary={ethers.formatEther(item.amount).substring(0, 5)}
            secondary="ETH"
          ></ListItemText>
          <ListItemText
            primary="Address"
            secondary={
              <React.Fragment>
                <Typography onClick={() => nav(`/credits/${item.address}`)}>
                  {formatAddress(item.address)}
                </Typography>
              </React.Fragment>
            }
          ></ListItemText>
          <ListItemAvatar>{index + 1}</ListItemAvatar>
        </ListItem>
      ))}
    </List>
  );
};

export default CreditList;
