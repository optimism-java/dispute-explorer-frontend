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
import { FC, useState } from 'react';
import TableRowSkeleton from '../../components/TableRowSkeleton';
import useGames from '../../hooks/useGames';
import { GameStatus } from '../../lib/constants';
import { SearchParams } from '../../lib/types';
import { calculateDate, formatAddress } from '../../lib/utils';

const Index: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<SearchParams>({
    limit: 10,
    offset: (page - 1) * 10,
  });
  const state = useGames(params);
  const count = Math.round((state.value?.estimatedTotalHits || 0) / 10);

  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-end' }}>
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
            {state.loading && <TableRowSkeleton rowNum={10} colNum={6} />}
            {!state.loading &&
              state.value?.hits?.map((item) => (
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
      <Pagination
        variant="outlined"
        color="primary"
        page={page}
        count={count}
        onChange={(e, page) => {
          setPage(page);
          setParams({ ...params, offset: (page - 1) * 10 });
        }}
      />
    </Stack>
  );
};

export default Index;
