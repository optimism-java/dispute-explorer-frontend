import {
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC } from 'react';
import useGames from '../../hooks/useGames';
import { GameStatus } from '../../lib/constants';
import { calculateDate, formatAddress } from '../../lib/utils';

const Index: FC = () => {
  const state = useGames();
  return (
    <Stack spacing={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Game Type</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>L2 block</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.value?.hits?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.game_type}</TableCell>
                <TableCell>{formatAddress(item.game_contract)}</TableCell>
                <TableCell>{item.l2_block_number}</TableCell>
                <TableCell>
                  {calculateDate(new Date(item.block_time * 1000))}
                </TableCell>
                <TableCell>{GameStatus[item.status]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination variant="outlined" color="primary" />
    </Stack>
  );
};

export default Index;
