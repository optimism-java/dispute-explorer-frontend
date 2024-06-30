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
import { ethers } from 'ethers';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableRowSkeleton from '../../components/TableRowSkeleton';
import useCreditDetail from '../../hooks/useCreditDetail';
import { SearchParams } from '../../lib/types';
import { formatAddress } from '../../lib/utils';

const Index: FC<any> = () => {
  const { addr } = useParams();
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<SearchParams>({
    limit: 10,
    offset: 0,
    q: addr,
  });
  const state = useCreditDetail(params);
  const count = Math.round((state.value?.estimatedTotalHits || 0) / 10);

  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-end' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.loading && <TableRowSkeleton rowNum={10} colNum={3} />}
            {!state.loading &&
              state.value?.hits?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{formatAddress(item.address)}</TableCell>
                  <TableCell>
                    {ethers.formatEther(item.credit.toString())}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={count}
        page={page}
        onChange={(e, page) => {
          console.log(page);
          setPage(page);
          setParams({
            ...params,
            offset: (page - 1) * 10,
          });
        }}
      />
    </Stack>
  );
};

export default Index;
