import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { ethers } from 'ethers';
import React, { FC, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import bonus from '../../assets/images/bonus.png';
import { Credit } from '../../lib/types';
import { formatAddress } from '../../lib/utils';

interface CreditListProps {
  credits?: Credit[];
}
const CreditList: FC<CreditListProps> = ({ credits }) => {
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
        {credits?.map((item, index) => (
          <ListItem alignItems="flex-start" key={item.address}>
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
                  <Stack direction={'row'} gap={2}>
                    <Typography
                      component={'span'}
                      onClick={() => nav(`/games/${item.address}`)}
                      sx={{ color: 'primary.main', cursor: 'pointer' }}
                    >
                      {formatAddress(item.address)}
                    </Typography>
                    <CopyToClipboard
                      text={item.address}
                      onCopy={(text, res) => setOpen(res)}
                    >
                      <ContentCopyIcon sx={{ color: 'black' }} />
                    </CopyToClipboard>
                  </Stack>
                </React.Fragment>
              }
            ></ListItemText>
            <ListItemAvatar>{index + 1}</ListItemAvatar>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CreditList;
