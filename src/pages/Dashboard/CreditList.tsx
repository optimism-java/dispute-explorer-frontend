import {
  Avatar,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Stack,
  Tooltip,
} from '@mui/material';
import { ethers } from 'ethers';
import React, { FC, useState } from 'react';
import bonus from '../../assets/images/bonus.png';
import { Credit } from '../../lib/types';
import { formatAddress } from '../../lib/utils';

interface CreditListProps {
  credits?: Credit[];
}
const CreditList: FC<CreditListProps> = ({ credits }) => {
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
              primary={
                <span className="font-dogica text-sm">
                  {ethers.formatEther(item.amount).substring(0, 5)}
                </span>
              }
              secondary={<span className="font-dogica text-sm">ETH</span>}
            ></ListItemText>
            <ListItemText
              primary={<span className="font-dogica text-sm">Address</span>}
              secondary={
                <React.Fragment>
                  <Stack direction={'row'} gap={2}>
                    <Tooltip title={item.address} placement="top">
                      <Link href={`/credits/${item.address}`} underline="hover">
                        <span className="font-dogica text-sm">
                          {formatAddress(item.address)}
                        </span>
                      </Link>
                    </Tooltip>
                    {/* <Typography
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
                    </CopyToClipboard> */}
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
